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
