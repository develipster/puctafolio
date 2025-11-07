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
      'Dream analysis and symbol interpretation',
      'Individuation process guidance framework',
      'Four-stage therapeutic process (Confession, Elucidation, Education, Transformation)',
      'Gamification layer with symbolic journey metaphors',
      'Privacy-first architecture with ethical AI safeguards'
    ],
    blogPost: '/blog/advanced-topics-ai-jung-project',
    // githubRepo: 'https://github.com/develipster/jung-ai', // Add when ready
    // liveDemo: 'https://jung-ai.vercel.app' // Add when deployed
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
  status: 'in-progress'
};