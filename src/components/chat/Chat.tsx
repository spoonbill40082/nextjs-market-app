import { TUserWithChat } from '@/types'
import React, { useEffect, useRef } from 'react'
import Input from './Input'
import ChatHeader from './ChatHeader'
import Message from './Message'

interface ChatProps {
  currentUser: TUserWithChat,
  receiver: {
    receiverId: string,
    receiverName: string,
    receiverImage: string,
  },
  setLayout: (layout: boolean) => void
}

const Chat = ({
  currentUser,
  receiver,
  setLayout
}: ChatProps) => {

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth"      
    })
  }

  useEffect(() => {
    scrollToBottom()
  })
  

  if (!receiver.receiverName || !currentUser) {
    return <div className='w-full h-full'></div>
  }

  const conversation = 
  currentUser?.consversations.find((conversation) => 
    conversation.users.find((user) => user.id === receiver.receiverId)
  )

  return (
    <div className='w-full'>
      
      <div>
        {/* chat header */}
        <ChatHeader 
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
            .filter(message => message.receiverId === currentUser.id)
            .slice(-1)[0]?.createdAt
          }
        />
      </div>

      <div className='flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)] '>
        {/* chat message */}
        {conversation &&
          conversation.messages
          .map((message) => {
            return (
              <Message 
                key={message.id}
                isSender={message.senderId === currentUser.id}
                messageText={message.text}
                messageImage={message.image}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser?.image}
                time={message.createdAt}
              />
            )
          })
        }
        <div ref={messagesEndRef} />
      </div>
      
      <div>
        <Input 
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}          
        />
      </div>
    </div>
  )
}

export default Chat