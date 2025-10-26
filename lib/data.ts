import fs from 'fs'
import path from 'path'

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// 文章接口
export interface Post {
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

// 项目接口
export interface Project {
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

// 初始化数据文件
function initDataFiles() {
  if (!fs.existsSync(POSTS_FILE)) {
    fs.writeFileSync(POSTS_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2))
  }
}

// 读取文章数据
export function getPosts(): Post[] {
  initDataFiles()
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// 保存文章数据
export function savePosts(posts: Post[]): void {
  initDataFiles()
  try {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error('Error saving posts:', error)
  }
}

// 读取项目数据
export function getProjects(): Project[] {
  initDataFiles()
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// 保存项目数据
export function saveProjects(projects: Project[]): void {
  initDataFiles()
  try {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2))
  } catch (error) {
    console.error('Error saving projects:', error)
  }
}

// 根据 ID 获取文章
export function getPostById(id: string): Post | null {
  const posts = getPosts()
  return posts.find(post => post.id === id) || null
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): Post | null {
  const posts = getPosts()
  return posts.find(post => post.slug === slug) || null
}

// 根据 ID 获取项目
export function getProjectById(id: string): Project | null {
  const projects = getProjects()
  return projects.find(project => project.id === id) || null
}

// 根据 slug 获取项目
export function getProjectBySlug(slug: string): Project | null {
  const projects = getProjects()
  return projects.find(project => project.slug === slug) || null
}

// 创建新文章
export function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post {
  const posts = getPosts()
  const newPost: Post = {
    ...post,
    id: generateId(),
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  posts.push(newPost)
  savePosts(posts)
  return newPost
}

// 更新文章
export function updatePost(id: string, updates: Partial<Post>): Post | null {
  const posts = getPosts()
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return null
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  savePosts(posts)
  return posts[index]
}

// 删除文章
export function deletePost(id: string): boolean {
  const posts = getPosts()
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return false
  
  posts.splice(index, 1)
  savePosts(posts)
  return true
}

// 创建新项目
export function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
  const projects = getProjects()
  const newProject: Project = {
    ...project,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  projects.push(newProject)
  saveProjects(projects)
  return newProject
}

// 更新项目
export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getProjects()
  const index = projects.findIndex(project => project.id === id)
  if (index === -1) return null
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveProjects(projects)
  return projects[index]
}

// 删除项目
export function deleteProject(id: string): boolean {
  const projects = getProjects()
  const index = projects.findIndex(project => project.id === id)
  if (index === -1) return false
  
  projects.splice(index, 1)
  saveProjects(projects)
  return true
}

// 生成唯一 ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 生成 slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
