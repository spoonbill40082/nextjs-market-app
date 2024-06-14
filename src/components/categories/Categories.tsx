'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FaSkiing } from 'react-icons/fa'
import { GiBoatFishing, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import CategoryBox from './CategoryBox'

export const categories = [
  {
    label: '디지털 기기',
    path: 'digital',
    icon: TbBeach,
    descriptioin: '디지털 기기 카테고리입니다.'
  },
  {
    label: '생활 가전',
    path: 'appliances',
    icon: GiWindmill,
    descriptioin: '생활 가전 카테고리입니다.'
  },
  {
    label: '가구/인테리어',
    path: 'interior',
    icon: MdOutlineVilla,
    descriptioin: '가구/인테리어 카테고리입니다.'
  },
  {
    label: '여성 의류',
    path: 'women-clothing',
    icon: TbMountain,
    descriptioin: '여성 의류 카테고리입니다.'
  },
  {
    label: '남성 패션/잡화',
    path: 'men-fashion',
    icon: TbPool,
    descriptioin: '남성 패션/잡화 카테고리입니다.'
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: GiIsland,
    descriptioin: '뷰티/미용 카테고리입니다.'
  },
  {
    label: '스포츠/레저',
    path: 'sports',
    icon: GiBoatFishing,
    descriptioin: '스포츠/레저 카테고리입니다.'
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: FaSkiing,
    descriptioin: '중고차 카테고리입니다.'
  },
]


const Categories = () => {
  const params = useSearchParams()
  console.log(params?.get('category'))
  const category = params?.get('category')

  return (
    <div
      className='flex flex-row items-center justify-between pt-4 overflow-x-auto'
    >
      {categories.map((item) => (
        <CategoryBox 
          key={item.label}
          label={item.label}
          path={item.path}
          icon={item.icon}
          selected={category === item.path}
        />
      ))}
    </div>
  )
}

export default Categories