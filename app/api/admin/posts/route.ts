import { NextRequest, NextResponse } from 'next/server'
import { getPosts, savePosts, createPost, updatePost, deletePost } from '@/lib/data'

export async function GET() {
  try {
    const posts = getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = createPost(body)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
