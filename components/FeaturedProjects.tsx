import Link from 'next/link'
import { Github, ExternalLink, Star, GitFork } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  topics: string[]
  githubUrl: string
  demoUrl?: string
  imageUrl?: string
}

const featuredProjects: Project[] = [
  {
    id: '1',
    name: '智能数据分析平台',
    description: '基于React和Python构建的数据可视化平台，支持多种数据源接入和实时分析。',
    language: 'TypeScript',
    stars: 42,
    forks: 8,
    topics: ['React', 'Python', 'Data Visualization', 'Machine Learning'],
    githubUrl: 'https://github.com/example/data-platform',
    demoUrl: 'https://demo.example.com',
  },
  {
    id: '2',
    name: '个人博客系统',
    description: '使用Next.js和MDX构建的现代化博客系统，支持Markdown写作和SEO优化。',
    language: 'JavaScript',
    stars: 28,
    forks: 5,
    topics: ['Next.js', 'MDX', 'Blog', 'SEO'],
    githubUrl: 'https://github.com/example/blog-system',
    demoUrl: 'https://blog.example.com',
  },
  {
    id: '3',
    name: '移动端电商应用',
    description: 'React Native开发的跨平台电商应用，包含完整的购物车和支付功能。',
    language: 'JavaScript',
    stars: 35,
    forks: 12,
    topics: ['React Native', 'E-commerce', 'Mobile', 'Payment'],
    githubUrl: 'https://github.com/example/ecommerce-app',
  },
]

export default function FeaturedProjects() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            精选项目
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            这里展示了我的一些重要项目，涵盖了前端开发、数据分析和移动应用等领域
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="card p-6 group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {project.name}
                </h3>
                <div className="flex space-x-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <Github size={20} />
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {project.language}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star size={16} className="mr-1" />
                    {project.stars}
                  </div>
                  <div className="flex items-center">
                    <GitFork size={16} className="mr-1" />
                    {project.forks}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            查看所有项目
            <ExternalLink className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
