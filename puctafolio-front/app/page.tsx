import { BlogPosts } from 'app/components/posts'
import KnowledgeGraph from './graph/graph'
import { knowledgeData } from './graph/knowledge'

export default function Page() {
  return (
    <section>
      <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0">
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          My Portfolio
        </h1>
        <p className="mb-4">
          {`I'm a Computer Engineering student at Pontificia Universidad Católica de Chile.
          This is my portfolio showcasing my projects, blog posts, and academic journey.`}
        </p>
      </div>

      <div className="mx-[50px] my-8">
        <KnowledgeGraph data={knowledgeData} />
      </div>

      <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0">
        <div className="my-8">
          <BlogPosts />
        </div>
      </div>
    </section>
  )
}