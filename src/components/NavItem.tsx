import { User } from '@prisma/client';
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null
}

const NavItem = ({mobile, currentUser}: NavItemProps) => {
  // 화면 크기에 따라 mobile이라는 이름이 붙은 내용이 나올 수도 있고, 안 나올 수도 있게 만든다.
  // ${} 안에 mobile일 때 적용 사항을 적어준다.
  // Limk를 이용하면 링크 경로와 폴더 이름을 맞추어 경로가 설정된다.
  

  
  return (
    <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>
      <li className='py-2 text-center border-b-4 cursor-pointer'>
        <Link href='/admin'>ADMIN</Link>
      </li>
      <li className='py-2 text-center border-b-4 cursor-pointer'>
        <Link href='/user'>USER</Link>
      </li>

{/* 로그인 세션에 대해... 로그인이 되어 있으면 Signout, 안 되어 있으면 Signin이 나오게 한다. */}
{/* <button>SIGN IN</button>을 누르면 로그인 페이지가 나오게 해주어야 한다. */}
{/* nextAuth에서 signIn 함수를 import해서 사용한다. signOut도 마찬가지. */}

      {currentUser
        ?<li className='py-2 text-center border-b-4 cursor-pointer'>
          <button
            onClick={() => signOut()}
          >SIGN OUT</button>
        </li>
        :<li className='py-2 text-center border-b-4 cursor-pointer'>
          <button
            onClick={() => signIn()}
          >SIGN IN</button>
        </li>
      }
    </ul>
  )
}

export default NavItem