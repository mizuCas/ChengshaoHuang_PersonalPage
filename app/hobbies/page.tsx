import { Activity, Music, BookOpen, TrendingUp, Calendar, Target } from 'lucide-react'

interface WeightRecord {
  date: string
  weight: number
  note?: string
}

interface KpopFavorite {
  artist: string
  song: string
  album: string
  year: number
  genre: string
}

interface BookRead {
  title: string
  author: string
  genre: string
  rating: number
  year: number
  status: 'completed' | 'reading' | 'planned'
}

const weightRecords: WeightRecord[] = [
  { date: '2024-01-20', weight: 68.5, note: '坚持运动第365天' },
  { date: '2024-01-15', weight: 69.0, note: '周末聚餐后' },
  { date: '2024-01-10', weight: 68.8, note: '正常饮食' },
  { date: '2024-01-05', weight: 69.2, note: '新年目标开始' },
]

const kpopFavorites: KpopFavorite[] = [
  { artist: 'NewJeans', song: 'Get Up', album: 'Get Up', year: 2023, genre: 'K-Pop' },
  { artist: 'LE SSERAFIM', song: 'UNFORGIVEN', album: 'UNFORGIVEN', year: 2023, genre: 'K-Pop' },
  { artist: 'aespa', song: 'Spicy', album: 'MY WORLD', year: 2023, genre: 'K-Pop' },
  { artist: 'IVE', song: 'I AM', album: 'I\'ve IVE', year: 2023, genre: 'K-Pop' },
  { artist: 'ITZY', song: 'Cake', album: 'KILL MY DOUBT', year: 2023, genre: 'K-Pop' },
]

const booksRead: BookRead[] = [
  { title: '射雕英雄传', author: '金庸', genre: '武侠小说', rating: 5, year: 2023, status: 'completed' },
  { title: '神雕侠侣', author: '金庸', genre: '武侠小说', rating: 5, year: 2023, status: 'completed' },
  { title: '倚天屠龙记', author: '金庸', genre: '武侠小说', rating: 4, year: 2023, status: 'completed' },
  { title: '天龙八部', author: '金庸', genre: '武侠小说', rating: 5, year: 2024, status: 'reading' },
  { title: '笑傲江湖', author: '金庸', genre: '武侠小说', rating: 0, year: 2024, status: 'planned' },
]

export default function HobbiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              兴趣爱好
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              除了工作，我也有丰富多彩的业余生活。这些爱好让我的生活更加充实，
              也让我在忙碌的工作之余找到了平衡和乐趣。
            </p>
          </div>

          {/* Weight Management Section */}
          <section className="mb-20">
            <div className="card p-8">
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mr-4">
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">体重管理</h2>
                  <p className="text-gray-600">科学管理体重，记录健身数据和饮食计划</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">体重记录</h3>
                  <div className="space-y-4">
                    {weightRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(record.date).toLocaleDateString('zh-CN')}
                          </div>
                          {record.note && (
                            <div className="text-sm text-gray-600">{record.note}</div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          {record.weight}kg
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">健身目标</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">目标体重</span>
                        <span className="text-lg font-bold text-blue-600">65kg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">还需减重 3.5kg</div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">坚持天数</span>
                        <span className="text-lg font-bold text-green-600">365天</span>
                      </div>
                      <div className="text-sm text-gray-600">连续运动记录</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* K-Pop Section */}
          <section className="mb-20">
            <div className="card p-8">
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <Music size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">KPOP音乐</h2>
                  <p className="text-gray-600">热爱韩国流行音乐，关注最新的音乐趋势和艺人动态</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">最近收藏</h3>
                  <div className="space-y-3">
                    {kpopFavorites.map((song, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{song.song}</div>
                          <div className="text-sm text-gray-600">{song.artist} - {song.album}</div>
                        </div>
                        <div className="text-sm text-gray-500">{song.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">音乐统计</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">收藏歌曲</span>
                        <span className="text-lg font-bold text-purple-600">500+</span>
                      </div>
                      <div className="text-sm text-gray-600">持续增长中</div>
                    </div>

                    <div className="p-4 bg-pink-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">关注艺人</span>
                        <span className="text-lg font-bold text-pink-600">50+</span>
                      </div>
                      <div className="text-sm text-gray-600">涵盖多个世代</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Wuxia Novels Section */}
          <section className="mb-20">
            <div className="card p-8">
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mr-4">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">武侠小说</h2>
                  <p className="text-gray-600">沉迷于金庸、古龙等大师的武侠世界，品味江湖情仇</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">阅读记录</h3>
                  <div className="space-y-3">
                    {booksRead.map((book, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{book.title}</div>
                          <div className="text-sm text-gray-600">{book.author} - {book.year}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < book.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            book.status === 'completed' ? 'bg-green-100 text-green-800' :
                            book.status === 'reading' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {book.status === 'completed' ? '已读完' :
                             book.status === 'reading' ? '阅读中' : '计划中'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">阅读统计</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">已读数量</span>
                        <span className="text-lg font-bold text-green-600">100+</span>
                      </div>
                      <div className="text-sm text-gray-600">武侠小说为主</div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">平均评分</span>
                        <span className="text-lg font-bold text-yellow-600">4.5/5</span>
                      </div>
                      <div className="text-sm text-gray-600">金庸作品评分最高</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
