# Instructions for Claude Code: Advanced Topics in AI Course Page Development

## Project Overview
You're building a course detail page for "Advanced Topics in AI (IIC3692)" that showcases the Jung.AI project - a Deep Learning LLM mimicking Carl Jung's teachings using RAG (Retrieval Augmented Generation) with a vector database.

## File Structure to Create

```
puctafolio-front/
├── app/
│   ├── courses/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic course page (NEW)
│   ├── components/
│   │   └── course-card.tsx       # Reusable course card (NEW)
│   └── blog/posts/
│       └── advanced-topics-ai-jung-project.mdx  # Blog post documenting project (NEW)
```

## Step-by-Step Implementation

### 1. Create Dynamic Course Route Structure
**File**: `app/courses/[slug]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Course data interface
interface CourseData {
  id: string;
  title: string;
  code: string;
  description: string;
  mainProject?: {
    name: string;
    description: string;
    technologies: string[];
    keyFeatures: string[];
    blogPost?: string; // Link to detailed blog post
  };
  learningObjectives: string[];
  prerequisites?: string[];
}

// Course database (can be moved to separate file later)
const coursesData: Record<string, CourseData> = {
  'advanced-topics-ai': {
    id: 'advanced-topics-ai',
    title: 'Advanced Topics in AI',
    code: 'IIC3692',
    description: 'This course explores advanced concepts and techniques in artificial intelligence, including deep learning, reinforcement learning, and natural language processing.',
    mainProject: {
      name: 'Jung.AI',
      description: 'A Deep Learning LLM that mimics the knowledge and teachings of Carl Jung using Retrieval Augmented Generation (RAG) with a vector database.',
      technologies: [
        'Python',
        'LangChain',
        'Vector Database (Pinecone/Weaviate)',
        'OpenAI API / Anthropic Claude',
        'FastAPI',
        'React/Next.js Frontend'
      ],
      keyFeatures: [
        'RAG implementation with Jung\'s complete works',
        'Jungian personality type analysis',
        'Archetypal interpretation engine',
        'Dream analysis and symbol interpretation',
        'Individuation process guidance',
        'Four-stage therapeutic framework (Confession, Elucidation, Education, Transformation)'
      ],
      blogPost: '/blog/advanced-topics-ai-jung-project'
    },
    learningObjectives: [
      'Implement advanced deep learning architectures',
      'Design and deploy RAG systems',
      'Apply NLP techniques to psychological texts',
      'Build production-ready AI applications',
      'Understand ethical considerations in AI-assisted therapy'
    ],
    prerequisites: ['Artificial Intelligence (IIC2613)', 'Data Mining (IIC2433)']
  }
};

// Metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = coursesData[params.slug];
  
  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  return {
    title: `${course.title} (${course.code})`,
    description: course.description,
  };
}

// Main component
export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = coursesData[params.slug];

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-4 lg:mx-auto px-2 md:px-0">
      {/* Course Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {course.title}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          {course.code}
        </p>
      </div>

      {/* Course Description */}
      <section className="mb-12">
        <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
          {course.description}
        </p>
      </section>

      {/* Main Project Section */}
      {course.mainProject && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Project</h2>
          
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 bg-neutral-50 dark:bg-neutral-900">
            <h3 className="text-xl font-semibold mb-3">{course.mainProject.name}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              {course.mainProject.description}
            </p>

            {/* Technologies Used */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {course.mainProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-3">
                Key Features
              </h4>
              <ul className="space-y-2">
                {course.mainProject.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-neutral-500 mr-2">→</span>
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link to detailed blog post */}
            {course.mainProject.blogPost && (
              
                href={course.mainProject.blogPost}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read full project documentation →
              </a>
            )}
          </div>
        </section>
      )}

      {/* Learning Objectives */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Learning Objectives</h2>
        <ul className="space-y-3">
          {course.learningObjectives.map((objective) => (
            <li key={objective} className="flex items-start">
              <span className="text-neutral-500 mr-3">•</span>
              <span className="text-neutral-700 dark:text-neutral-300">{objective}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prerequisites */}
      {course.prerequisites && course.prerequisites.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
          <ul className="space-y-2">
            {course.prerequisites.map((prereq) => (
              <li key={prereq} className="text-neutral-700 dark:text-neutral-300">
                {prereq}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

// Generate static params for all courses
export function generateStaticParams() {
  return Object.keys(coursesData).map((slug) => ({
    slug,
  }));
}
```

### 2. Update Knowledge Graph to Link to Course Pages

**File**: `app/graph/graph.tsx` (MODIFY existing file)

Add click handler to course nodes:

```typescript
// Inside the useEffect where you create nodes, add:
node.on('click', (event: any, d: any) => {
  if (d.type === 'course') {
    // Extract course slug from label (you may need to add slug to data)
    const slug = d.label.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .split('-')
      .slice(0, -1) // Remove course code
      .join('-');
    
    // Only navigate if the course page exists
    if (slug === 'advanced-topics-in-ai') {
      window.location.href = `/courses/advanced-topics-ai`;
    }
  }
});

// Add visual feedback on hover
node.on('mouseover', function(event: any, d: any) {
  if (d.type === 'course') {
    d3.select(this).select('circle')
      .transition()
      .duration(200)
      .attr('stroke-width', 3)
      .style('cursor', 'pointer');
  }
})
.on('mouseout', function(event: any, d: any) {
  if (d.type === 'course') {
    d3.select(this).select('circle')
      .transition()
      .duration(200)
      .attr('stroke-width', 1.5);
  }
});
```

### 3. Update Knowledge Graph Data

**File**: `app/graph/knowledge.tsx` (MODIFY existing)

Add `slug` property to the Advanced Topics in AI course node:

```typescript
{"id": 67, "label": "Advanced Topics in AI (IIC3692)", "size": "m", "type": "course", "slug": "advanced-topics-ai"},
```

### 4. Create Blog Post Documenting Jung.AI Project

**File**: `app/blog/posts/advanced-topics-ai-jung-project.mdx`

```mdx
---
title: "Jung.AI: Building a Jungian Psychology LLM with RAG"
publishedAt: "2025-11-07"
summary: "Deep dive into developing an AI system that embodies Carl Jung's psychological theories using Retrieval Augmented Generation and vector databases."
---

## Project Overview

Jung.AI represents the culmination of my Advanced Topics in AI course (IIC3692), combining deep learning, natural language processing, and psychological theory to create an AI system capable of providing Jungian psychological insights.

## The Vision

The goal is to create an AI therapeutic companion that doesn't just mimic conversational patterns, but truly understands and applies Jungian psychology principles including:

- **Archetypal analysis** - Identifying which Jungian archetypes are active in a person's life
- **Individuation guidance** - Supporting the journey toward psychological wholeness
- **Dream interpretation** - Analyzing symbols and patterns in dreams
- **Shadow work** - Helping users confront and integrate repressed aspects

## Technical Architecture

### RAG Implementation

The system uses Retrieval Augmented Generation to ground responses in Jung's actual writings:

1. **Vector Database**: Stores embeddings of Jung's complete works
2. **Retrieval System**: Finds relevant passages based on user queries
3. **LLM Integration**: Claude or GPT-4 generates responses informed by retrieved context

### Data Pipeline

```python
# Simplified architecture
1. Preprocess Jung's texts (OCR, cleaning, chunking)
2. Generate embeddings using sentence-transformers
3. Store in Pinecone/Weaviate vector database
4. Query pipeline: User input → Embedding → Similarity search → Context retrieval
5. Augmented prompt: System instructions + Retrieved context + User query
6. LLM generates Jungian-informed response
```

## Key Challenges

### 1. Therapeutic Framework
Implementing Jung's four-stage therapeutic process:
- **Confession**: Safe space for disclosure
- **Elucidation**: Understanding patterns and symbols
- **Education**: Learning new frameworks
- **Transformation**: Integration and growth

### 2. Personality Type Analysis
Mapping Jung's psychological types (thinking/feeling, sensing/intuition, intro/extraversion) to user interactions.

### 3. Ethical Considerations
- Clear disclaimers that this is educational, not clinical therapy
- Privacy and data security for sensitive personal information
- Preventing over-reliance on AI for mental health

## Current Progress

- ✅ Vector database setup with Jung's core texts
- ✅ Basic RAG pipeline functional
- 🚧 Archetypal detection algorithm
- 🚧 Dream analysis module
- 📅 Planned: Gamification layer (symbolic journey metaphors)

## Future Enhancements

The ambitious vision includes a gamified experience where users embark on symbolic journeys (like tending a tree representing their connection to environment), making psychological work engaging and accessible.

## Technical Stack

- **Backend**: Python, FastAPI, LangChain
- **Vector DB**: Pinecone
- **LLM**: Anthropic Claude (for nuanced psychological understanding)
- **Frontend**: Next.js, React
- **Deployment**: Vercel (frontend), AWS (backend)

---

This project demonstrates the intersection of AI, psychology, and user experience design - a perfect showcase of applied machine learning in a meaningful context.
```

### 5. Add Navigation Link

**File**: `app/components/nav.tsx` (MODIFY if needed)

Consider adding a "Courses" link to the navigation if you want to create a courses listing page later.

## Testing Checklist

Implementation complete! All features verified:

- [x] Navigate to `/courses/advanced-topics-ai` - page renders correctly
- [x] All sections display properly (description, project, objectives, prerequisites)
- [x] Technology tags and key features render correctly
- [x] Link to blog post works
- [x] Dark mode styling looks good
- [x] Mobile responsiveness works
- [x] TypeScript compiles without errors
- [x] Click on "Advanced Topics in AI" node in knowledge graph navigates to course page
- [x] Hover effect on course nodes shows pointer cursor

## Implementation Status

**✅ COMPLETED - November 7, 2025**

All core features have been successfully implemented and tested:

### Files Created:
1. `/app/courses/[slug]/page.tsx` - Dynamic course route with full TypeScript support
2. `/app/blog/posts/advanced-topics-ai-jung-project.mdx` - Comprehensive blog post
3. `/app/courses/advancedTopicsAI/jung_ai.tsx` - Course data export

### Files Modified:
1. `/app/graph/graph.tsx` - Added click handlers and hover effects for course navigation
2. `/app/graph/knowledge.tsx` - Added `slug: "advanced-topics-ai"` to course node

### Known Issues:
- **Next.js 15 Async Params**: Fixed compatibility issue where `params` is now a Promise
- Original solution updated to use `await params` syntax

### Testing Results:
- ✅ Development server running without errors
- ✅ Course page accessible at http://localhost:3000/courses/advanced-topics-ai
- ✅ Blog post indexed and accessible at http://localhost:3000/blog/advanced-topics-ai-jung-project
- ✅ Knowledge graph clickable navigation functional
- ✅ All TypeScript types properly defined
- ✅ No compilation errors

## Build Commands

```bash
# Development
pnpm dev

# Type check
pnpm build

# Lint
pnpm lint
```

## Next Steps After Implementation

1. **Expand course database**: Add other courses from knowledge graph
2. **Create courses index page**: `/courses` listing all available courses
3. **Add project galleries**: Screenshot/demo sections for projects
4. **Implement course filtering**: By category, technology, or semester
5. **Add "Related Courses"**: Show prerequisite/related courses at bottom

## Notes for Implementation

- Use **Server Components** by default (no "use client" needed for this page)
- Keep **TypeScript strict** - define all interfaces properly
- Follow **Next.js 15 App Router** conventions
- Use **Tailwind CSS** utility classes (no custom CSS)
- Ensure **responsive design** - test on mobile viewport
- Add **proper metadata** for SEO
- Consider **loading states** if you add dynamic data later

---

This structure provides a solid foundation that can be extended to showcase all your university projects while maintaining clean, type-safe, and performant code. The Jung.AI project serves as an excellent centerpiece demonstrating your full-stack AI development capabilities.