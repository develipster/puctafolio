import { BlogPosts } from 'app/components/posts'
import KnowledgeGraph from 'app/graph/graph'
import { knowledgeData } from 'app/graph/knowledge'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        PUC-tafolio by <i>develipster</i>
      </h1>
      <p className="mb-4">
        {`I'm a recent Computer Engineering graduate with expertise in full-stack development,
        cloud computing, and data-driven solutions. Proven track record in developing scalable
        web applications using modern technologies including React.js, Node.js, Python, and AWS.
        Strong foundation in software architecture, process mining, and artificial intelligence.
        Passionate about creating efficient, well-documented solutions that drive business value
        and optimize user experiences.`}
      </p>
      <div className="my-4">
        <KnowledgeGraph data={knowledgeData} width={800} height={400} />
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
