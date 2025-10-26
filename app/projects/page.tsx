import { Github, ExternalLink, Star, GitFork, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

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
  updatedAt: string
  createdAt: string
}

const allProjects: Project[] = [
  {
    id: '1',
    name: '智能数据分析平台',
    description: '基于React和Python构建的数据可视化平台，支持多种数据源接入和实时分析。采用现代化的技术栈，提供直观的数据展示和交互体验。',
    language: 'TypeScript',
    stars: 42,
    forks: 8,
    topics: ['React', 'Python', 'Data Visualization', 'Machine Learning', 'D3.js'],
    githubUrl: 'https://github.com/example/data-platform',
    demoUrl: 'https://demo.example.com',
    updatedAt: '2024-01-15',
    createdAt: '2023-08-20',
  },
  {
    id: '2',
    name: '个人博客系统',
    description: '使用Next.js和MDX构建的现代化博客系统，支持Markdown写作和SEO优化。具备响应式设计和暗色模式。',
    language: 'JavaScript',
    stars: 28,
    forks: 5,
    topics: ['Next.js', 'MDX', 'Blog', 'SEO', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/blog-system',
    demoUrl: 'https://blog.example.com',
    updatedAt: '2024-01-10',
    createdAt: '2023-06-15',
  },
  {
    id: '3',
    name: '移动端电商应用',
    description: 'React Native开发的跨平台电商应用，包含完整的购物车和支付功能。支持iOS和Android双平台。',
    language: 'JavaScript',
    stars: 35,
    forks: 12,
    topics: ['React Native', 'E-commerce', 'Mobile', 'Payment', 'Redux'],
    githubUrl: 'https://github.com/example/ecommerce-app',
    updatedAt: '2024-01-08',
    createdAt: '2023-09-10',
  },
  {
    id: '4',
    name: 'AI聊天机器人',
    description: '基于OpenAI API开发的智能聊天机器人，支持多轮对话和上下文理解。具备Web和移动端界面。',
    language: 'Python',
    stars: 56,
    forks: 15,
    topics: ['Python', 'OpenAI', 'Chatbot', 'AI', 'FastAPI'],
    githubUrl: 'https://github.com/example/ai-chatbot',
    demoUrl: 'https://chat.example.com',
    updatedAt: '2024-01-12',
    createdAt: '2023-11-01',
  },
  {
    id: '5',
    name: '任务管理工具',
    description: '全栈任务管理应用，支持团队协作、项目跟踪和进度管理。采用微服务架构设计。',
    language: 'TypeScript',
    stars: 31,
    forks: 7,
    topics: ['Vue.js', 'Node.js', 'MongoDB', 'Microservices', 'Docker'],
    githubUrl: 'https://github.com/example/task-manager',
    updatedAt: '2024-01-05',
    createdAt: '2023-07-20',
  },
  {
    id: '6',
    name: '区块链钱包',
    description: '支持多种加密货币的区块链钱包应用，具备安全的私钥管理和交易功能。',
    language: 'Rust',
    stars: 89,
    forks: 23,
    topics: ['Rust', 'Blockchain', 'Cryptocurrency', 'Security', 'Web3'],
    githubUrl: 'https://github.com/example/blockchain-wallet',
    updatedAt: '2024-01-18',
    createdAt: '2023-05-10',
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              项目成果
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              这里展示了我参与开发的所有项目，涵盖了前端、后端、移动端和区块链等多个技术领域。
              每个项目都体现了不同的技术挑战和解决方案。
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allProjects.length}
              </div>
              <div className="text-gray-600">项目总数</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allProjects.reduce((sum, project) => sum + project.stars, 0)}
              </div>
              <div className="text-gray-600">总星标数</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {allProjects.reduce((sum, project) => sum + project.forks, 0)}
              </div>
              <div className="text-gray-600">总Fork数</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {new Set(allProjects.map(p => p.language)).size}
              </div>
              <div className="text-gray-600">使用语言</div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allProjects.map((project) => (
              <div key={project.id} className="card p-8 group">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {project.name}
                  </h3>
                  <div className="flex space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      <Github size={20} />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {project.language}
                  </span>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
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

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    创建于 {format(new Date(project.createdAt), 'yyyy年MM月', { locale: zhCN })}
                  </div>
                  <div>
                    更新于 {format(new Date(project.updatedAt), 'MM月dd日', { locale: zhCN })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
