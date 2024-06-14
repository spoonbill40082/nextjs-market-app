'use client'

import usePagination from '@lucasmogari/react-pagination'
import React from 'react'
import PaginationLink from './PaginationLink'

interface PaginationProps {
  page: number,
  totalItems: number,
  perPage: number
}

const Pagination = ({page, totalItems, perPage}: PaginationProps) => {

  const { fromItem, toItem, getPageItem, totalPages } = usePagination({
    totalItems: totalItems,
    page: page,
    itemsPerPage: perPage,
    maxPageItems: 5
  })

  const firstPage = 1
  const nextPage = Math.min(page + 1, totalPages)
  const prevPage = Math.max(page - 1, firstPage)
  // 몇 번 순환할지 정해주는 내용이 const arr
  const arr = new Array(totalPages + 2)

  // console.log('getPageItem', getPageItem)
  // console.log('totlaPages', totalPages)

  return (
// usePagination 훅 사용하기
// npm install @lucasmogari/react-pagination

    <div className='flex items-center justify-center gap-2 mt-4'>
      {/* Item {fromItem}-{toItem} */}
      {[...arr].map((_, i) => {
        const {page, disabled, current} = getPageItem(i)
        // console.log('page, disabled, current', page, disabled, current)

        if (page === 'previous') {
          return (<PaginationLink 
            key={i}
            disabled={disabled}
            page={prevPage}
            >
              {'<'}
            </PaginationLink>)
        }
        if (page === 'next') {
          return (<PaginationLink 
            key={i}
            disabled={disabled}
            page={nextPage}
            >
              {'>'}
            </PaginationLink>)
        }

        if (page ==='gap') {
          return (<span key={i}>...</span>)
        }

        return (<PaginationLink 
          key={i}
          active={current}
          page={page}
          >
            {page}
          </PaginationLink>)
      })}
    </div>
  )
}

export default Pagination