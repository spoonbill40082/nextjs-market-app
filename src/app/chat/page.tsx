import React from 'react'
import ChatClient from './ChatClient'
import getCurrentUser from '../actions/getCurrentUser'



const ChatPage = async () => {

  const currentUser = await getCurrentUser()

  return (
    <ChatClient
      currentUser={currentUser}
    />
  )
}

export default ChatPage