import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  readTime: string
  category: string
  slug: string
}

const recentPosts: BlogPost[] = [
  {
    id: '1',
    title: '2024年Web开发趋势分析',
    excerpt: '探讨今年最值得关注的Web开发技术趋势，包括AI集成、边缘计算和新的框架特性。',
    publishedAt: '2024-01-15',
    readTime: '8分钟',
    category: '技术趋势',
    slug: 'web-development-trends-2024',
  },
  {
    id: '2',
    title: '产品经理的数字化转型思考',
    excerpt: '从传统产品到数字化产品的转变过程中，产品经理需要具备哪些新的思维和能力。',
    publishedAt: '2024-01-10',
    readTime: '12分钟',
    category: '产品思考',
    slug: 'product-manager-digital-transformation',
  },
  {
    id: '3',
    title: '用户体验设计的心理学原理',
    excerpt: '深入分析用户行为背后的心理学原理，以及如何将这些原理应用到产品设计中。',
    publishedAt: '2024-01-05',
    readTime: '10分钟',
    category: '设计思考',
    slug: 'ux-design-psychology-principles',
  },
]

export default function RecentPosts() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            最新观察
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            分享我对行业趋势的思考、产品使用体验和工作经验总结
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
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

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            查看所有文章
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
