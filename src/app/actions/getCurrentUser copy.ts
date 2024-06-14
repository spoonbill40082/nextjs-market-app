import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    console.log("Session:", session);  // 세션 정보를 로그로 출력

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    console.log("Current User:", currentUser);  // 쿼리 결과를 로그로 출력

    if (!currentUser) {
      return null;
    }

    return currentUser;

  } catch (error) {
    console.error("Error fetching current user:", error);  // 오류를 로그로 출력
    return null;
  }
}
