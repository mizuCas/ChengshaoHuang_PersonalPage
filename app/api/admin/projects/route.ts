import { NextRequest, NextResponse } from 'next/server'
import { getProjects, saveProjects, createProject, updateProject, deleteProject } from '@/lib/data'

export async function GET() {
  try {
    const projects = getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const project = createProject(body)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
