import { promises as fs } from 'fs'
import path from 'path'
import { generateId, generateSlug } from './utils'

// 数据文件路径
const DATA_DIR = path.join(process.cwd(), 'data')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

// 确保数据目录存在
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
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
async function initDataFiles() {
  await ensureDataDir()
  try {
    await fs.access(POSTS_FILE)
  } catch {
    await fs.writeFile(POSTS_FILE, JSON.stringify([], null, 2))
  }
  try {
    await fs.access(PROJECTS_FILE)
  } catch {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify([], null, 2))
  }
}

// 读取文章数据
export async function getPosts(): Promise<Post[]> {
  await initDataFiles()
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// 保存文章数据
export async function savePosts(posts: Post[]): Promise<void> {
  await initDataFiles()
  try {
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error('Error saving posts:', error)
  }
}

// 读取项目数据
export async function getProjects(): Promise<Project[]> {
  await initDataFiles()
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// 保存项目数据
export async function saveProjects(projects: Project[]): Promise<void> {
  await initDataFiles()
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2))
  } catch (error) {
    console.error('Error saving projects:', error)
  }
}

// 根据 ID 获取文章
export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find(post => post.id === id) || null
}

// 根据 slug 获取文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts()
  return posts.find(post => post.slug === slug) || null
}

// 根据 ID 获取项目
export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(project => project.id === id) || null
}

// 根据 slug 获取项目
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(project => project.slug === slug) || null
}

// 创建新文章
export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
  const posts = await getPosts()
  const newPost: Post = {
    ...post,
    id: generateId(),
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  posts.push(newPost)
  await savePosts(posts)
  return newPost
}

// 更新文章
export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
  const posts = await getPosts()
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return null
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  await savePosts(posts)
  return posts[index]
}

// 删除文章
export async function deletePost(id: string): Promise<boolean> {
  const posts = await getPosts()
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return false
  
  posts.splice(index, 1)
  await savePosts(posts)
  return true
}

// 创建新项目
export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const projects = await getProjects()
  const newProject: Project = {
    ...project,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  projects.push(newProject)
  await saveProjects(projects)
  return newProject
}

// 更新项目
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const projects = await getProjects()
  const index = projects.findIndex(project => project.id === id)
  if (index === -1) return null
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  await saveProjects(projects)
  return projects[index]
}

// 删除项目
export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects()
  const index = projects.findIndex(project => project.id === id)
  if (index === -1) return false
  
  projects.splice(index, 1)
  await saveProjects(projects)
  return true
}

