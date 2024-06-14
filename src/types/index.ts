import { Message, User } from "@prisma/client";

export type TUserWithChat = User & {
  consversations: TConversation[]
}

export type TConversation = {
  id: string
  messages: Message[]
  users: User[]
}