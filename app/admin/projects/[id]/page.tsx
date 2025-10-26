'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import { generateSlug } from '@/lib/data'

interface Project {
  id: string
  title: string
  description: string
  content: string
  slug: string
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  technologies: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function ProjectEditor() {
  const router = useRouter()
  const params = useParams()
  const isEdit = params.id && params.id !== 'new'
  
  const [project, setProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    content: '',
    slug: '',
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    technologies: [],
    featured: false
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [techInput, setTechInput] = useState('')

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    if (isEdit) {
      loadProject()
    }
  }, [isEdit, router])

  const loadProject = async () => {
    if (!params.id) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`)
      if (response.ok) {
        const projectData = await response.json()
        setProject(projectData)
      }
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const projectData = {
        ...project,
        slug: project.slug || generateSlug(project.title || '')
      }

      const url = isEdit ? `/api/admin/projects/${params.id}` : '/api/admin/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const addTechnology = () => {
    if (techInput.trim() && !project.technologies?.includes(techInput.trim())) {
      setProject({
        ...project,
        technologies: [...(project.technologies || []), techInput.trim()]
      })
      setTechInput('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setProject({
      ...project,
      technologies: project.technologies?.filter(tech => tech !== techToRemove) || []
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                {isEdit ? '编辑项目' : '新建项目'}
              </h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? '保存中...' : '保存项目'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目名称
            </label>
            <input
              type="text"
              value={project.title || ''}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入项目名称"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL 别名
            </label>
            <input
              type="text"
              value={project.slug || ''}
              onChange={(e) => setProject({ ...project, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="project-slug"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目描述
            </label>
            <textarea
              value={project.description || ''}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入项目描述"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目图片 URL
            </label>
            <input
              type="url"
              value={project.imageUrl || ''}
              onChange={(e) => setProject({ ...project, imageUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/project-image.jpg"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub 链接
            </label>
            <input
              type="url"
              value={project.githubUrl || ''}
              onChange={(e) => setProject({ ...project, githubUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/username/project"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              在线演示链接
            </label>
            <input
              type="url"
              value={project.liveUrl || ''}
              onChange={(e) => setProject({ ...project, liveUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://project-demo.com"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              技术栈
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入技术名称后按回车添加"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700"
              >
                添加
              </button>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={project.featured || false}
              onChange={(e) => setProject({ ...project, featured: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              设为精选项目
            </label>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              项目详情
            </label>
            <RichTextEditor
              content={project.content || ''}
              onChange={(content) => setProject({ ...project, content })}
              placeholder="详细介绍项目..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
