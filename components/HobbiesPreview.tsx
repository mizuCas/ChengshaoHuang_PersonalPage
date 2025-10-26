import Link from 'next/link'
import { ArrowRight, Activity, Music, BookOpen } from 'lucide-react'

interface Hobby {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  stats: string
  color: string
}

const hobbies: Hobby[] = [
  {
    id: '1',
    title: '体重管理',
    description: '通过科学的方法管理体重，记录健身数据和饮食计划',
    icon: <Activity size={24} />,
    stats: '坚持365天',
    color: 'bg-red-100 text-red-600',
  },
  {
    id: '2',
    title: 'KPOP音乐',
    description: '热爱韩国流行音乐，关注最新的音乐趋势和艺人动态',
    icon: <Music size={24} />,
    stats: '收藏500+首',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: '3',
    title: '武侠小说',
    description: '沉迷于金庸、古龙等大师的武侠世界，品味江湖情仇',
    icon: <BookOpen size={24} />,
    stats: '阅读100+本',
    color: 'bg-green-100 text-green-600',
  },
]

export default function HobbiesPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            兴趣爱好
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            除了工作，我也有丰富多彩的业余生活，这些爱好让我的生活更加充实
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hobbies.map((hobby) => (
            <div key={hobby.id} className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${hobby.color} mb-6 mx-auto`}>
                {hobby.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {hobby.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {hobby.description}
              </p>

              <div className="text-sm font-medium text-gray-500">
                {hobby.stats}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/hobbies"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            了解更多
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
