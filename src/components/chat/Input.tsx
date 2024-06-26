import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { RiSendPlaneLine } from 'react-icons/ri'
import useSWRMutation from 'swr/mutation'

interface InputProps {
  receiverId: string
  currentUserId: string
}

const sendRequest = (url: string, {arg}: {
  arg: {
    text: string
    Image: string
    receiverId: string
    senderId: string
  }
}) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

const Input = ({
  receiverId,
  currentUserId
}: InputProps) => {

  const [message, setMessage] = useState('')
  const {trigger} = useSWRMutation('/api/chat', sendRequest)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imgUrl = ''

    if (message || imgUrl) {
      try {
        trigger({
          text: message,
          Image: imgUrl,
          receiverId: receiverId,
          senderId: currentUserId
        })
        // await axios.post('/api/chat', {
        //   text: message,
        //   Image: imgUrl,
        //   receiverId: receiverId,
        //   senderId: currentUserId
        // })
      } catch (error) {
        console.error(error) 
      }
    }
    setMessage('')
  }


  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm'
    >
      <input 
        className='w-full text-base outline-none'
        type='text'
        placeholder='메시지를 작성해 주세요.'      
        value={message}  
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='text-2xl text-gray-200s cursor-pointer'>
        <IoImageOutline />
      </div>
      <button
        type='submit'
        className='flex items-center justify-center p-2 text-gray-900 bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-60'
      >
        <RiSendPlaneLine className='text-white'/>
      </button>
    </form>
  )
}

export default Input