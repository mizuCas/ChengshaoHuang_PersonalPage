export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我</h3>
            <p className="text-gray-300">
              热爱技术，关注行业动态，分享生活点滴。希望通过这个网站记录成长轨迹。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速导航</h3>
            <ul className="space-y-2">
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                  项目成果
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">
                  行业观察
                </a>
              </li>
              <li>
                <a href="/hobbies" className="text-gray-300 hover:text-white transition-colors duration-200">
                  兴趣爱好
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系方式</h3>
            <div className="space-y-2">
              <p className="text-gray-300">邮箱: your-email@example.com</p>
              <p className="text-gray-300">GitHub: github.com/yourusername</p>
              <p className="text-gray-300">LinkedIn: linkedin.com/in/yourprofile</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 黄承劭. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
