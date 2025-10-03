'use client'

import * as d3 from "d3"
import { useEffect, useRef } from "react"

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
  data, // knowledge.json
  width = 650,
  height = 400,

}: {
  data: GraphData,
  width?: number,
  height?: number
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
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

    // Initialize force simulation
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

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
      .attr("r", (d: any) => d.id === 1 ? 20: 15) // Larger circle for central node
      .attr("fill", (d: any) => d.id === 1 ? "#ff5722" : "#2196f3") // Different color for central node
      .attr("stroke", "#333")
      .attr("stroke-width", 1.5);

    // Add labels to nodes
    node.append("text")
      .text((d: any) => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 4)
      .attr("font-size", "10px")
      .attr("fill", "#333");

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
  }, [data, width, height]);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg"
      />
    </div>
  );
}