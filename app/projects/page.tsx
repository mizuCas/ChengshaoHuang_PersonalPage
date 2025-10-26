import { Github, ExternalLink, Star, GitFork, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { getProjects } from '@/lib/data'

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

export default async function ProjectsPage() {
  const allProjectsData = await getProjects()
  const allProjects = allProjectsData.map(project => ({
    id: project.id,
    name: project.title,
    description: project.description,
    language: project.technologies[0] || 'JavaScript',
    stars: Math.floor(Math.random() * 100), // 模拟数据
    forks: Math.floor(Math.random() * 20),
    topics: project.technologies,
    githubUrl: project.githubUrl || '#',
    demoUrl: project.liveUrl,
    updatedAt: project.updatedAt,
    createdAt: project.createdAt,
  }))
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
