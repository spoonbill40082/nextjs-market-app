// 특정 아이디를 통해 로그인한 자에 대해 필요한 정보를 보여줄 수 있게 해줌.

import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"


// export const config = { matcher: ["/admin/:path*", "/user"] }
// 로그인이 된 사람만 admin과 user 경로에 접근해 페이지를 볼 수 있다.
// 예) export const config = { matcher: ["/dashboard"] } 로그인한 사람만 대시보드에 들어갈 수 있음.
// admin 하위의 다른 페이지들에 대해서도 접근 설정을 하려면 admin 뒤에 /:path*를 붙여주면 된다.


export async function middleware(req: NextRequest) {

  // 세션 데이터를 가져오려면 getToken을 사용한다.
  const session = await getToken({ req, secret: process.env.JWT_SECRET })
  const pathname = req.nextUrl.pathname

  // 로그인한 유저만 접근 가능하게.
  if (pathname.startsWith('/user') && !session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url))
  }

  // 어드민 유저만 접근 가능하게.
  if (pathname.startsWith('/admin') && (session?.role !== 'Admin')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // 로그인한 유저는 로그인 페이지로, 회원가입 페이지에는 접근하지 않도록 함.
  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}


