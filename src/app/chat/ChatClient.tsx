'use client'

import Chat from '@/components/chat/Chat'
import Contacts from '@/components/chat/Contacts'
import { TUserWithChat } from '@/types'
import { User } from '@prisma/client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'

interface ChatClientProps {
  currentUser?: User | null
}

const ChatClient = ({ currentUser }: ChatClientProps) => {

  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  })

  useEffect(() => {
    axios.get(`/api/chat`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  }, [])

  const [layout, setLayout] = useState(false)

  const fetcher = (url: string) => axios.get(url).then((res) => res.data)
  const {data: users, error, isLoading} = useSWR('/api/chat/', fetcher, {
    refreshInterval: 1000
  })

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  )

  if (error) return <p>ERROR!</p>
  if (isLoading) return <p>Loading...</p>

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
        {/* md보다 클 때는 둘 다 보여야 한다. */}
        {/* md보다 작고 layout이 true일 때는 contact가 안 보여야 한다. */}
        <section className={`md:flex ${layout && 'hidden'}`}>
          {/* contact component */}
          <Contacts 
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>

        {/* md보다 클 때는 둘 다 보여야 한다. */}
        {/* md보다 작고 layout이 false일 때는 chat이 안 보여야 한다. */}
        <section className={`md:flex ${!layout && 'hidden'}`}>
          {/* chat component */}
          <Chat 
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  )
}

export default ChatClient
