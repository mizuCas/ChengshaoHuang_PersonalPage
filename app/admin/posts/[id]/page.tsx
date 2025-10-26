'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import { generateSlug } from '@/lib/utils'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  featured: boolean
  status: 'draft' | 'published'
  coverImage?: string
}

export default function PostEditor() {
  const router = useRouter()
  const params = useParams()
  const isEdit = params.id && params.id !== 'new'
  
  const [post, setPost] = useState<Partial<Post>>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    tags: [],
    featured: false,
    status: 'draft',
    coverImage: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    if (isEdit) {
      loadPost()
    }
  }, [isEdit, router])

  const loadPost = async () => {
    if (!params.id) return
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`)
      if (response.ok) {
        const postData = await response.json()
        setPost(postData)
      }
    } catch (error) {
      console.error('Error loading post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (status: 'draft' | 'published' = 'draft') => {
    setIsSaving(true)
    try {
      const postData = {
        ...post,
        status,
        slug: post.slug || generateSlug(post.title || ''),
        publishedAt: status === 'published' && !post.publishedAt 
          ? new Date().toISOString() 
          : post.publishedAt
      }

      const url = isEdit ? `/api/admin/posts/${params.id}` : '/api/admin/posts'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const savedPost = await response.json()
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Error saving post:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !post.tags?.includes(tagInput.trim())) {
      setPost({
        ...post,
        tags: [...(post.tags || []), tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setPost({
      ...post,
      tags: post.tags?.filter(tag => tag !== tagToRemove) || []
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
                {isEdit ? '编辑文章' : '新建文章'}
              </h1>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSave('draft')}
                disabled={isSaving}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? '保存中...' : '保存草稿'}
              </button>
              <button
                onClick={() => handleSave('published')}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                {isSaving ? '发布中...' : '发布'}
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
              标题
            </label>
            <input
              type="text"
              value={post.title || ''}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入文章标题"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL 别名
            </label>
            <input
              type="text"
              value={post.slug || ''}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="url-slug"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              摘要
            </label>
            <textarea
              value={post.excerpt || ''}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入文章摘要"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              封面图片 URL
            </label>
            <input
              type="url"
              value={post.coverImage || ''}
              onChange={(e) => setPost({ ...post, coverImage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              标签
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入标签后按回车添加"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
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
              checked={post.featured || false}
              onChange={(e) => setPost({ ...post, featured: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              设为精选文章
            </label>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容
            </label>
            <RichTextEditor
              content={post.content || ''}
              onChange={(content) => setPost({ ...post, content })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
