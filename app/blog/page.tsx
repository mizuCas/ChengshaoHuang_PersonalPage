import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { getPosts } from '@/lib/data'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  slug: string
  featured: boolean
}

const categories = ['全部', '技术趋势', '产品思考', '设计思考', '技术分享', '架构设计', '工具分享']

export default async function BlogPage() {
  const allPosts = await getPosts()
  const posts = allPosts.filter(post => post.status === 'published')
  const blogPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    publishedAt: post.publishedAt,
    readTime: '5分钟', // 可以根据内容长度计算
    category: '技术分享', // 可以根据标签或其他逻辑分类
    tags: post.tags,
    slug: post.slug,
    featured: post.featured,
  }))
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              行业观察
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              记录我对技术趋势的观察、产品使用的体验、工作经验的总结。
              希望通过分享这些思考，与同行交流学习。
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  category === '全部'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Posts */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">精选文章</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map((post) => (
                <article key={post.id} className="card p-8 group">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {format(new Date(post.publishedAt), 'yyyy年MM月dd日', { locale: zhCN })}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    阅读全文
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">所有文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="card p-6 group">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{post.tags.length - 3}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {format(new Date(post.publishedAt), 'MM月dd日', { locale: zhCN })}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    阅读全文
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
