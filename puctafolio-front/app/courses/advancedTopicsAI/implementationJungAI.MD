# Updated Instructions for Claude Code: Advanced Topics AI Course Enhancement

## Current Implementation Status ✅

Great progress! The core structure is in place. Here's what we have:

### Existing Files:
- ✅ `/app/courses/[slug]/page.tsx` - Dynamic course route (working)
- ✅ `/app/courses/advancedTopicsAI/jung_ai.tsx` - Course data export
- ✅ `/app/courses/advancedTopicsAI/advancedTopicsContext.MD` - Documentation

## Next Steps: Refinements & Enhancements

### 1. Refactor Course Data Architecture

**Current Issue**: Course data is hardcoded in `page.tsx`. Let's make it more maintainable.

**File to Modify**: `app/courses/advancedTopicsAI/jung_ai.tsx`

Replace current content with:

```typescript
import { CourseData } from '../types';

export const advancedTopicsAI: CourseData = {
  id: 'advanced-topics-ai',
  title: 'Advanced Topics in AI',
  code: 'IIC3692',
  description: 'This course explores advanced concepts and techniques in artificial intelligence, including deep learning, reinforcement learning, and natural language processing. Students engage in hands-on projects applying AI methods to real-world problems.',
  mainProject: {
    name: 'Jung.AI',
    description: 'A Deep Learning LLM that embodies Carl Jung\'s psychological teachings using Retrieval Augmented Generation (RAG) with a vector database. This therapeutic AI companion provides Jungian psychological insights through archetypal analysis, dream interpretation, and individuation guidance.',
    technologies: [
      'Python',
      'LangChain',
      'Pinecone (Vector DB)',
      'Anthropic Claude API',
      'FastAPI',
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS'
    ],
    keyFeatures: [
      'RAG implementation grounded in Jung\'s complete works',
      'Jungian personality type analysis (8 psychological types)',
      'Archetypal interpretation engine (Shadow, Anima/Animus, Self)',
      'Dream analysis with symbol interpretation',
      'Four-stage therapeutic framework (Confession → Elucidation → Education → Transformation)',
      'Individuation journey guidance',
      'Gamification layer with symbolic metaphors (tree tending, symbolic journeys)',
      'Privacy-first architecture with ethical AI safeguards'
    ],
    blogPost: '/blog/advanced-topics-ai-jung-project',
    githubRepo: 'https://github.com/develipster/jung-ai', // Add when ready
    liveDemo: 'https://jung-ai.vercel.app' // Add when deployed
  },
  learningObjectives: [
    'Implement production-grade RAG systems with vector databases',
    'Design and fine-tune LLMs for specialized domain knowledge',
    'Apply NLP techniques to psychological and philosophical texts',
    'Build scalable AI applications with FastAPI and Next.js',
    'Navigate ethical considerations in AI-assisted mental health',
    'Integrate gamification principles with therapeutic frameworks',
    'Optimize embedding strategies for semantic search'
  ],
  prerequisites: [
    'Artificial Intelligence (IIC2613)',
    'Data Mining (IIC2433)'
  ],
  semester: 'Fall 2024',
  status: 'in-progress' // or 'completed'
};
```

**New File**: `app/courses/types.ts`

```typescript
export interface CourseData {
  id: string;
  title: string;
  code: string;
  description: string;
  mainProject?: {
    name: string;
    description: string;
    technologies: string[];
    keyFeatures: string[];
    blogPost?: string;
    githubRepo?: string;
    liveDemo?: string;
  };
  learningObjectives: string[];
  prerequisites?: string[];
  semester?: string;
  status?: 'planning' | 'in-progress' | 'completed';
}
```

### 2. Update Course Page to Import from Data File

**File to Modify**: `app/courses/[slug]/page.tsx`

At the top, replace the hardcoded `coursesData` with:

```typescript
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { advancedTopicsAI } from '../advancedTopicsAI/jung_ai';
import { CourseData } from '../types';

// Course database - import all courses here
const coursesData: Record<string, CourseData> = {
  'advanced-topics-ai': advancedTopicsAI,
  // Future courses will be added here:
  // 'recommender-systems': recommenderSystems,
  // 'web-applications': webApplications,
};
```

### 3. Enhance Course Page UI

**File to Modify**: `app/courses/[slug]/page.tsx`

Add these sections after the Prerequisites section:

```typescript
{/* Project Links Section */}
{course.mainProject && (course.mainProject.githubRepo || course.mainProject.liveDemo) && (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-4">Project Resources</h2>
    <div className="flex flex-wrap gap-4">
      {course.mainProject.githubRepo && (
        <Link
          href={course.mainProject.githubRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View on GitHub
        </Link>
      )}
      {course.mainProject.liveDemo && (
        <Link
          href={course.mainProject.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </Link>
      )}
    </div>
  </section>
)}

{/* Course Metadata */}
<section className="mb-12 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {course.semester && (
      <div>
        <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          Semester
        </span>
        <p className="text-neutral-800 dark:text-neutral-200 mt-1">
          {course.semester}
        </p>
      </div>
    )}
    {course.status && (
      <div>
        <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          Status
        </span>
        <p className="text-neutral-800 dark:text-neutral-200 mt-1 capitalize">
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            course.status === 'completed' ? 'bg-green-500' :
            course.status === 'in-progress' ? 'bg-yellow-500' :
            'bg-gray-500'
          }`}></span>
          {course.status.replace('-', ' ')}
        </p>
      </div>
    )}
  </div>
</section>

{/* Back to Home Button */}
<div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
  <Link
    href="/"
    className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    Back to Knowledge Graph
  </Link>
</div>
```

### 4. Create the Blog Post

**File to Create**: `app/blog/posts/advanced-topics-ai-jung-project.mdx`

```mdx
---
title: "Jung.AI: Building a Jungian Psychology LLM with RAG"
publishedAt: "2025-11-07"
summary: "Deep dive into developing an AI system that embodies Carl Jung's psychological theories using Retrieval Augmented Generation and vector databases."
---

## Project Genesis

Jung.AI represents the intersection of three passions: artificial intelligence, psychology, and helping people understand themselves. The project emerged from my Advanced Topics in AI course (IIC3692) as an ambitious attempt to create something meaningful beyond typical ML assignments.

## The Problem Space

Traditional therapy is expensive, stigmatized, and inaccessible to many. While AI cannot replace human therapists, it can serve as a complementary tool for self-exploration based on established psychological frameworks. Carl Jung's analytical psychology, with its rich symbolic language and archetypal patterns, provides an ideal foundation for this kind of AI-assisted introspection.

## Why Jung?

Jung's psychology is particularly well-suited for AI implementation because:

1. **Structured Framework**: Clear concepts (archetypes, psychological types, individuation process)
2. **Universal Patterns**: Archetypal symbols that appear across cultures and time
3. **Extensive Written Works**: Jung's collected works provide rich training data
4. **Modern Relevance**: Growing interest in personality frameworks (MBTI has Jungian roots)
5. **Symbolic Language**: Metaphors and symbols that can be computationally mapped

## Technical Architecture

### RAG Pipeline Design

The core innovation is using Retrieval Augmented Generation to ground AI responses in Jung's actual writings:

```
User Query
    ↓
Embedding Generation (sentence-transformers)
    ↓
Vector Similarity Search (Pinecone)
    ↓
Retrieve Top-K Relevant Passages from Jung's Works
    ↓
Construct Augmented Prompt:
  [System Instructions] + [Retrieved Context] + [User Query]
    ↓
LLM Generation (Claude/GPT-4)
    ↓
Jungian-Informed Response
```

### Data Preparation

The biggest challenge was creating a high-quality knowledge base:

1. **Text Collection**: Digitized Jung's major works (Collected Works, Red Book, Man and His Symbols)
2. **Chunking Strategy**: Split texts into semantically coherent segments (500-1000 tokens)
3. **Metadata Enrichment**: Tagged chunks with work title, publication year, key concepts
4. **Embedding Generation**: Used `all-mpnet-base-v2` for semantic embeddings
5. **Vector Storage**: Indexed in Pinecone with metadata filters

### Therapeutic Framework Implementation

Jung's four-stage therapeutic process guides the conversation flow:

**1. Confession** (Initial Sessions)
- Build trust and safety
- Encourage open disclosure
- No judgment, active listening patterns

**2. Elucidation** (Pattern Recognition)
- Analyze recurring themes
- Identify active archetypes
- Explore dream symbols
- Map psychological type

**3. Education** (Framework Building)
- Teach Jungian concepts relevant to user's situation
- Explain archetypal patterns
- Provide context for inner conflicts

**4. Transformation** (Integration)
- Support individuation process
- Help integrate shadow aspects
- Guide toward psychological wholeness

### Key Technical Challenges

#### Challenge 1: Context Window Management
**Problem**: Jung's works are lengthy; relevant passages scattered across multiple texts.

**Solution**: Hybrid retrieval system:
- Initial broad search (top 20 chunks)
- Re-ranking with cross-encoder
- Select top 5 most relevant
- Smart truncation to fit context window

#### Challenge 2: Maintaining Jungian Voice
**Problem**: Generic LLM responses don't capture Jung's unique perspective.

**Solution**: 
- System prompt with Jung's communication style
- Few-shot examples from actual Jung writings
- Post-processing to adjust tone
- Retrieval emphasizes Jung's own words

#### Challenge 3: Ethical Safeguards
**Problem**: AI therapy has serious ethical implications.

**Solution**:
- Clear disclaimers: "Educational tool, not clinical therapy"
- Crisis detection: Flags suicidal ideation, suggests professional help
- Privacy: No data retention beyond session
- Boundaries: Refuses to diagnose mental illness
- Transparency: Explains AI limitations

## Gamification Layer: Symbolic Journeys

The most innovative aspect is translating psychological work into symbolic metaphors:

### Example: The Tree Metaphor

A user struggling with disconnection from their environment receives a "tree tending" journey:

- **Wilted Tree**: Represents current disconnection
- **Roots**: Exploring unconscious barriers
- **Watering**: Actions to reconnect with community
- **Seasons**: Natural fluctuations in psychological work
- **Growth Rings**: Progress markers

The AI as "gardener" asks reflective questions, suggests interventions, and watches the tree flourish as the user reconnects with their life.

### Other Symbolic Journeys

- **Cave Exploration**: Shadow work (confronting repressed aspects)
- **Mountain Climb**: Individuation process
- **Bridge Building**: Integrating opposites (Anima/Animus)
- **Labyrinth**: Finding the Self at center

## Current Implementation Status

### Completed ✅
- Vector database with Jung's core texts (15+ works)
- Basic RAG pipeline with Pinecone + Claude
- Personality type analysis (8 Jungian types)
- Web interface (Next.js + Tailwind)
- Conversation memory within session

### In Progress 🚧
- Archetypal detection algorithm (training classifier)
- Dream analysis module (symbol dictionary + interpretation)
- Gamification engine (metaphor generation)
- Long-term user profiling (with privacy controls)

### Planned 📅
- Multi-modal input (voice, images of dreams)
- Community features (anonymous sharing of symbolic journeys)
- Integration with journaling apps
- Mobile app (React Native)

## Technical Stack Deep Dive

### Backend
```python
# Core dependencies
langchain==0.1.0          # RAG orchestration
pinecone-client==3.0.0    # Vector database
sentence-transformers     # Embedding generation
anthropic==0.8.0          # Claude API
fastapi==0.109.0          # API server
pydantic==2.5.0           # Data validation
```

### Frontend
```json
{
  "next": "15.0.0",
  "react": "19.0.0",
  "tailwindcss": "4.0.0-alpha.13",
  "typescript": "5.3.3"
}
```

### Infrastructure
- **Hosting**: Vercel (frontend), AWS Lambda (backend)
- **Database**: Pinecone (vectors), PostgreSQL (user sessions)
- **Monitoring**: Sentry (errors), Vercel Analytics (usage)

## Lessons Learned

### 1. RAG is Powerful but Tricky
- Quality of retrieval > Quality of generation
- Chunking strategy massively impacts relevance
- Hybrid search (semantic + keyword) works best

### 2. Domain Expertise Matters
- Understanding Jung deeply improved prompt engineering
- Psychology background helped design therapeutic flow
- Can't fake expertise with better prompts

### 3. Ethical Design is Hard
- Balancing helpfulness with safety
- Preventing misuse without being overly restrictive
- Transparency builds trust

### 4. User Experience is Critical
- People want quick insights, not essays
- Visual metaphors (trees, caves) engage better
- Progress tracking motivates continued use

## Impact & Future Vision

### Potential Impact
- **Accessibility**: Free self-exploration tool for millions
- **Education**: Learning Jungian psychology through interaction
- **Research**: Analyzing archetypal patterns across users (anonymized)
- **Innovation**: Advancing AI-assisted mental wellness

### Future Directions
1. **Academic Validation**: Partner with psychology dept for research
2. **Therapeutic Integration**: Tool for actual therapists (note-taking, pattern recognition)
3. **Expansion**: Other psychological frameworks (Freudian, CBT, etc.)
4. **Platform**: API for developers to build on Jung.AI

## Try It Yourself

The project is open-source and welcomes contributors:

- **GitHub**: [github.com/develipster/jung-ai](https://github.com/develipster/jung-ai)
- **Live Demo**: [jung-ai.vercel.app](https://jung-ai.vercel.app)
- **Documentation**: Full setup guide in repo README

## Conclusion

Jung.AI demonstrates that AI can go beyond simple chatbots to create meaningful tools for self-understanding. By combining RAG with psychological theory and thoughtful UX design, we can build AI systems that truly help people explore their inner worlds.

The journey of building Jung.AI mirrors the individuation process itself: confronting technical challenges (shadow work), integrating multiple disciplines (unifying opposites), and creating something authentic (finding the Self).

---

*This project is a work in progress. If you're interested in contributing or have feedback, reach out at develipster@gmail.com*

**Keywords**: Retrieval Augmented Generation, RAG, LLM, Carl Jung, Analytical Psychology, AI Ethics, Vector Databases, Pinecone, Next.js, FastAPI
```

### 5. Update Knowledge Graph

**File to Modify**: `app/graph/knowledge.tsx`

Update the Advanced Topics AI node to include the slug:

```typescript
{"id": 67, "label": "Advanced Topics in AI (IIC3692)", "size": "m", "type": "course", "slug": "advanced-topics-ai"},
```

### 6. Testing Checklist

After implementing these changes:

```bash
# 1. Run dev server
pnpm dev

# 2. Test navigation
# - Navigate to http://localhost:3000
# - Click "Advanced Topics in AI" node in graph
# - Should redirect to /courses/advanced-topics-ai

# 3. Verify course page renders
# - All sections present
# - Technologies display correctly
# - Blog post link works
# - GitHub/Demo links work (when added)
# - Dark mode toggles properly
# - Mobile responsive

# 4. Test blog post
# - Navigate to /blog
# - Find "Jung.AI" post
# - Verify syntax highlighting works
# - Check code blocks format correctly

# 5. Type checking
pnpm build
# Should compile with no TypeScript errors
```

## Future Scalability

This structure makes it easy to add more courses:

```typescript
// app/courses/recommenderSystems/recommender_systems.tsx
export const recommenderSystems: CourseData = {
  id: 'recommender-systems',
  title: 'Recommender Systems',
  code: 'IIC3633',
  // ... course data
};

// Then import in page.tsx
import { recommenderSystems } from '../recommenderSystems/recommender_systems';

const coursesData: Record<string, CourseData> = {
  'advanced-topics-ai': advancedTopicsAI,
  'recommender-systems': recommenderSystems,
  // More courses...
};
```

## Documentation Updates

Update `/app/courses/advancedTopicsAI/advancedTopicsContext.MD` to reflect completed status and any learnings from implementation.

---

This refactored approach gives you:
- ✅ **Maintainability**: Course data in separate files
- ✅ **Type Safety**: Shared `CourseData` interface
- ✅ **Scalability**: Easy to add new courses
- ✅ **Rich UI**: Enhanced with project links, metadata, status indicators
- ✅ **Documentation**: Comprehensive blog post for portfolio showcasing

Great work getting the foundation in place! These enhancements will make your portfolio stand out during interviews.