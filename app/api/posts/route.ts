import { NextResponse } from 'next/server'
import { getPosts } from '@/lib/data'

export async function GET() {
  try {
    const posts = await getPosts()
    const publishedPosts = posts.filter(post => post.status === 'published')
    return NextResponse.json(publishedPosts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
