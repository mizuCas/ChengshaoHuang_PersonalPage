# 黄承劭个人网站

## 项目概述

这是一个使用 Next.js 14 + TypeScript + Tailwind CSS 构建的现代化个人网站，包含以下功能：

### 🚀 主要功能
- **项目成果展示**: 展示 GitHub 项目，包含项目统计和详情
- **行业观察随笔**: 博客系统，支持文章分类和标签
- **兴趣爱好展示**: 体重管理、KPOP音乐、武侠小说等个人爱好

### 🛠️ 技术栈
- **前端框架**: Next.js 14 (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **图标库**: Lucide React
- **日期处理**: date-fns
- **部署平台**: Vercel

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问网站
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── projects/          # 项目页面
│   ├── blog/              # 博客页面
│   └── hobbies/           # 兴趣爱好页面
├── components/            # React 组件
│   ├── Header.tsx         # 导航头部
│   ├── Footer.tsx         # 页脚
│   ├── Hero.tsx           # 首页英雄区
│   ├── FeaturedProjects.tsx
│   ├── RecentPosts.tsx
│   └── HobbiesPreview.tsx
├── public/                # 静态资源
└── vercel.json           # Vercel 部署配置
```

## 自定义配置

### 个人信息更新
1. 修改 `components/Header.tsx` 中的个人信息
2. 更新 `app/layout.tsx` 中的 metadata
3. 替换 `components/Footer.tsx` 中的联系方式

### 项目数据
编辑 `components/FeaturedProjects.tsx` 和 `app/projects/page.tsx` 中的项目数据。

### 博客文章
在 `app/blog/page.tsx` 中添加新的博客文章数据。

### 兴趣爱好
更新 `app/hobbies/page.tsx` 中的相关数据。

## 部署

### Vercel 部署
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（如需要）
4. 自动部署完成

## 功能特性

- ✅ 响应式设计，完美适配桌面端和移动端
- ✅ 现代化 UI 设计，使用 Tailwind CSS
- ✅ 流畅的动画效果，使用 Framer Motion
- ✅ SEO 优化，支持搜索引擎收录
- ✅ 快速加载，使用 Next.js 14 的优化特性
- ✅ 类型安全，使用 TypeScript
- ✅ 易于维护和扩展

## 许可证

MIT License

## 联系方式

- 邮箱: cslinktheworld@gmail.com
- GitHub: github.com/mizuCas