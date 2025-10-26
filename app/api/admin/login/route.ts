import { NextRequest, NextResponse } from 'next/server'

// 简单的认证配置（生产环境中应该使用更安全的方式）
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // 验证用户名和密码
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // 生成简单的 token（生产环境中应该使用 JWT）
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      return NextResponse.json({
        success: true,
        token,
        message: '登录成功'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: '用户名或密码错误'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '服务器错误'
    }, { status: 500 })
  }
}
