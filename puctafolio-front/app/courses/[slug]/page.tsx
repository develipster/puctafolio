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

// Metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = coursesData[slug];
  
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
export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = coursesData[slug];

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
              <Link
                href={course.mainProject.blogPost}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Read full project documentation →
              </Link>
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

      {/* Project Links Section */}
      {course.mainProject && (course.mainProject.githubRepo || course.mainProject.liveDemo) && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Project Resources</h2>
          <div className="flex flex-wrap gap-4">
            {course.mainProject.githubRepo && (
              <a
                href={course.mainProject.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            )}
            {course.mainProject.liveDemo && (
              <a
                href={course.mainProject.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </section>
      )}

      {/* Course Metadata */}
      {(course.semester || course.status) && (
        <section className="mb-12 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.semester && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-1">
                  Semester
                </h3>
                <p className="text-neutral-800 dark:text-neutral-200">{course.semester}</p>
              </div>
            )}
            {course.status && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-1">
                  Status
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  course.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' :
                  course.status === 'in-progress' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' :
                  'bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                }`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1).replace('-', ' ')}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

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
    </div>
  );
}

// Generate static params for all courses
export function generateStaticParams() {
  return Object.keys(coursesData).map((slug) => ({
    slug,
  }));
}
