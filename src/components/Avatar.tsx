import Image from 'next/image'
import React from 'react'

interface AvaterProps {
  src: string | null
}

const Avatar = ({src}: AvaterProps) => {
  return (
    <Image
      className='w-10 h-10 rounded-full'
      height={30}
      width={30}
      alt='Avatar'
      src={src || 'http://via.placeholder.com/400x400?text=no+user+image'}
    />
  )
}

export default Avatar