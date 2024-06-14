'use client'

import { User } from '@prisma/client'
import React, { useState } from 'react'

interface ChatClientProps {
  currentUser?: User | null
}


const ChatClient = ({currentUser}: ChatClientProps) => {
  
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  })

  const [layout, setLayout] = useState(false)
  
  
  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
          {/* md보다 클 때는 둘 다 보여야 한다. */}
          {/* md보다 작고 layout이 true일 때는 contact가 안 보여야 한다. */}
        <section className={`md:flex ${layout && 'hidden'}`}>
          {/* contact component */}
          contact component
        </section>

        {/* md보다 클 때는 둘 다 보여야 한다. */}
        {/* md보다 작고 layout이 false일 때는 chat이 안 보여야 한다. */}
        <section className={`md:flex ${!layout && 'hidden'}`}>
          {/* chat component */}
          chat component
        </section>
      </div>
    </main>
  )
}

export default ChatClient