import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/helpers/prismadb'

import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
// import { type Adapter } from "@auth/core/adapters"



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SEC!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "text", placeholder: "메일주소(아이디@google.com)" },
        password: { label: "비밀번호", type: "password" }
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user


        // // Add logic here to look up the user from the credentials supplied.
        // // 제공된 자격 증명에서 사용자를 조회하는 논리를 여기에 추가합니다.
        // const user = { id: "1", name: "jsmith", email: "jsmith@gmail.com", role: "Admin" }
        // // Any object returned will be saved in 'user' property of the JWT.
        // // 반환된 모든 객체는 JWT의 'user' 속성에 저장됩니다.
        // if (user) {
        //   return user
        // } else {
        //   // If you return null then an error will be diaplayed advising the user to check their details.
        //   // null을 반환하면 사용자에게 세부 정보를 확인하라고 알리는 오류가 표시됩니다.
        //   return null
        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        //   // 오류와 함께 이 콜백을 거부할 수도 있습니다. 따라서 사용자는 쿼리 매개변수로 오류 메시지와 함께 오류 페이지로 이동하게 됩니다.
        // }

      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60 //30일
  },

  pages: {
    signIn: '/auth/signin'
  },

  // 콜백 추가
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
      // return한 데이터가 세션의 token으로 간다.
    },
    async session({ session, token }) {
      session.user = token
      return session
    }
  }
}


export default NextAuth(authOptions)