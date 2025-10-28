'use client'

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface Node {
  id: number;
  label: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}
interface Edge {
  from: number;
  to: number;
  source?: Node;
  target?: Node;
}

interface GraphData {
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

export default function KnowledgeGraph({
  data,
  width,
  height = 400,
}: {
  data: GraphData,
  width?: number,
  height?: number
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: width || 800, height });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: width || containerRef.current.offsetWidth,
          height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [width, height]);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Clear previous svg content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create copies of nodes and edges to avoid mutating props
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.edges.map(d => ({
      source: d.from,
      target: d.to
    }));

    // Create SVG and groups
    const svg = d3.select(svgRef.current);
    const container = svg.append("g");

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // Custom collision force for rectangles and circles
    function collisionForce() {
      const nodes = simulation.nodes();

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA: any = nodes[i];
          const nodeB: any = nodes[j];

          const dx = nodeB.x! - nodeA.x!;
          const dy = nodeB.y! - nodeA.y!;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate collision radii including text boxes
          const radiusA = getNodeRadius(nodeA);
          const radiusB = getNodeRadius(nodeB);
          const textBoxA = getTextBoxDimensions(nodeA);
          const textBoxB = getTextBoxDimensions(nodeB);

          // Check for collision with stronger vertical separation
          const minDistanceX = Math.max(radiusA, textBoxA.width / 2) + Math.max(radiusB, textBoxB.width / 2);
          const minDistanceY = Math.max(radiusA, textBoxA.height) + Math.max(radiusB, textBoxB.height);

          if (distance < minDistanceX || Math.abs(dy) < minDistanceY) {
            const overlap = minDistanceY - Math.abs(dy);
            if (overlap > 0) {
              const pushX = (dx / distance) * overlap * 0.002; // Weak horizontal push
              const pushY = (dy / distance) * overlap * 0.005; // Strong vertical push

              nodeA.x! -= pushX;
              nodeA.y! -= pushY;
              nodeB.x! += pushX;
              nodeB.y! += pushY;
            }
          }
        }
      }
    }

    function getNodeRadius(d: any) {
      if (d.size === "xl") return 45;
      else if (d.size === "l") return 35;
      else if (d.size === "ml") return 30;
      else if (d.size === "m") return 25;
      else if (d.size === "ms") return 22;
      else if (d.size === "s") return 18;
      else if (d.size === "xs") return 14;
      return 15;
    }

    function getTextBoxDimensions(d: any) {
      const charWidth = d.size === "xl" || d.size === "l" ? 7 : d.size === "ml" || d.size === "m" ? 6 : 5;
      return {
        width: d.label.length * charWidth + 8,
        height: 16
      };
    }

    // Initialize force simulation
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => getNodeRadius(d)))
      .force("x", d3.forceX(dimensions.width / 2).strength(0.02))
      .force("y", d3.forceY(dimensions.height / 2).strength(0.05)) // Stronger vertical centering
      .force("customCollision", collisionForce);

    // Draw links
    const link = container.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5);

    // Draw nodes
    const node = container.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node");

    // Add circles to nodes
    node.append("circle")
      .attr("r", (d: any) => getNodeRadius(d))
      .attr("fill", (d: any) => {
        if (d.type === "central") return "#ff5722"; // Red for central node
        else if (d.type === "macro") return "#ff9800"; // Orange for macro topics
        else if (d.type === "course") return "#f5deb3"; // Beige for courses
        return "#2196f3"; // Default blue
      })
      .attr("stroke", "#333")
      .attr("stroke-width", 1.5);

    // Add text background rectangles
    node.append("rect")
      .attr("rx", 4) // Rounded corners
      .attr("ry", 4)
      .attr("fill", (d: any) => {
        if (d.type === "central") return "#ff8a65"; // Lighter red for central
        else if (d.type === "macro") return "#ffb74d"; // Lighter orange for macro
        else if (d.type === "course") return "#faebd7"; // Lighter beige for courses
        return "#64b5f6"; // Default lighter blue
      })
      .attr("stroke", (d: any) => {
        if (d.type === "central") return "#ff5722";
        else if (d.type === "macro") return "#ff9800";
        else if (d.type === "course") return "#f5deb3";
        return "#2196f3";
      })
      .attr("stroke-width", 1)
      .attr("x", function(d: any) {
        const textLength = d.label.length * (d.size === "xl" || d.size === "l" ? 7 : d.size === "ml" || d.size === "m" ? 6 : 5);
        return -textLength / 2 - 4;
      })
      .attr("y", -8)
      .attr("width", function(d: any) {
        const textLength = d.label.length * (d.size === "xl" || d.size === "l" ? 7 : d.size === "ml" || d.size === "m" ? 6 : 5);
        return textLength + 8;
      })
      .attr("height", 16);

    // Add labels to nodes
    node.append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("font-size", (d: any) => {
        if (d.size === "xl") return "12px";
        else if (d.size === "l") return "11px";
        else if (d.size === "ml" || d.size === "m") return "10px";
        else if (d.size === "ms") return "9px";
        else if (d.size === "s") return "8px";
        else if (d.size === "xs") return "7px";
        return "10px";
      })
      .attr("fill", "#000")
      .attr("font-weight", "500");

    // Define drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // apply drag behavior to nodes
    node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (d.source as any).x)
        .attr("y1", (d: any) => (d.source as any).y)
        .attr("x2", (d: any) => (d.target as any).x)
        .attr("y2", (d: any) => (d.target as any).y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup on unmount
    return () => {
      simulation.stop();
    };
  }, [data, dimensions.width, dimensions.height]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}