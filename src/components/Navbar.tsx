'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem'
import { User } from '@prisma/client'

interface NavbarProps{
  currentUser?: User | null
}

const Navbar = ({currentUser}: NavbarProps) => {

  // nav bar를 접거나 펼칠 때의 상태 관리를 위해 useState 사용
  const [menu, setMenu] = useState(false)
  console.log('currentUser', currentUser)

  // 버튼을 눌렀을 때 상태 변화가 발생할 수 있도록 함수 작성
  const handleMneu = () => {
    setMenu(!menu)
  }
  
  // text-2xl: 텍스트 크기를 2xl로 설정하는 클래스입니다. 이는 보통 큰 텍스트를 나타내는데 사용됩니다.
  // sm:hidden: 화면 크기가 작은(sm) 경우에는 해당 요소를 숨기는 클래스입니다. 일반적으로 모바일 화면 크기에서 사용됩니다.
  // sm:block은 작은 화면 크기(모바일 기기)에서 해당 요소를 블록 요소로 표시하도록 지정하는 것을 의미합니다. 이것은 일반적으로 모바일 화면에서 요소가 수직으로 쌓이도록 하고, 다른 스타일과 함께 사용될 수 있습니다.
  // mx-5: margin 상대값 주기

  return (
    <nav className='relative z-10 w-full bg-orange-500 text-white'>
      <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
        <div className='flex items-center text-2xl h-14'>
          <Link href='/'>Logo</Link>
        </div>

        <div className='text-2xl sm:hidden'>
          {
            menu === false? 
            <button onClick={handleMneu}>+</button>: 
            <button onClick={handleMneu}>-</button>
          }
        </div>

        <div className='hidden sm:block'>
          <NavItem currentUser={currentUser}/>
        </div>

      </div>
      
      <div className='block sm:hidden'>
        {/* 똑같은 NavItem이지만 뷰포트 너비에 따라 다르게 적용할 수 있도록 mobile이라는 이름을 통해 분기점을 만들고 NavItem에 props로 내려준다. */}
        {(menu === false)? null: <NavItem mobile currentUser={currentUser}/>}
      </div>
    </nav>
  )
}

export default Navbar