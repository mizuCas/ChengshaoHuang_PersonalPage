'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Mail, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            你好，我是
            <span className="text-blue-600 block mt-2">黄承劭</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            技术爱好者 | 行业观察者 | 生活分享者
          </p>
          
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            欢迎来到我的个人空间！这里记录着我的项目成果、行业观察随笔和兴趣爱好。
            让我们一起探索技术的魅力，分享生活的美好。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/projects"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              查看我的项目
              <ArrowDown className="ml-2" size={20} />
            </a>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Github size={24} className="text-gray-700" />
              </a>
              <a
                href="mailto:your-email@example.com"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Mail size={24} className="text-gray-700" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Linkedin size={24} className="text-gray-700" />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="animate-bounce">
              <ArrowDown size={24} className="text-gray-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
