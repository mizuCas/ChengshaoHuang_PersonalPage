// 生成 slug
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// 生成唯一 ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
