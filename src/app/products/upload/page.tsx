'use client'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ImageUpload from '@/components/ImageUpload'
import Input from '@/components/Input'
import { categories } from '@/components/categories/Categories'
import CategoryInput from '@/components/categories/CategoryInput'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const ProductUploadPage = () => {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

const {
  register, 
  handleSubmit, 
  setValue, 
  watch, 
  formState:{
    errors
  }, 
  reset
} =  useForm<FieldValues>({
  defaultValues: {
    title: '',
    description: '',
    category: '',
    latitude: 33.5563,
    longitude: 126.79581,    
    imageSrc: '',
    price: 1
  }
})

const imageSrc = watch('imageSrc')
const category = watch('category')

const latitude = watch('latitude')
const longitude = watch('longitude')

// Dynamic Import 사용(다이내믹 임포트는 기본적으로 csr이다.)
const KakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
  ssr: false
})

// 입력한 내용이 data라는 인수로 들어갈 수 있게 해주기
const onSubmit: SubmitHandler<FieldValues> = (data) => {
  setIsLoading(true)
  
  axios.post('/api/products', data)
    .then(response => {
      router.push(`/products/${response.data.id}`)
    })
    .catch((err) => {
      console.error('err', err)
    })
    .finally(() => {
      setIsLoading(false)
    })
}

const setCustomValue = (id: string, value: any) => {
  setValue(id, value);
}

  return (
    <Container>

      <div className='max-w-screen-lg mx-auto'>
        
        <form
        className='flex flex-col gap-8'
        onSubmit={handleSubmit(onSubmit)}
        >
          <Heading 
            title='Product Upload'
            subtitle='Upload Your Product'
          />
          
          {/* cloudinary를 이용해 이미지를 업로드할 수 있게 해줄 것이다. */}
          <ImageUpload 
            onChange={(value) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />
          <hr />

          <Input 
            id='title'
            label='Title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required        
          />
          <hr />

          <Input 
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required        
          />
          <hr />

          <Input 
            id='price'
            label='Price'
            formatPrice={true}
            disabled={isLoading}
            register={register}
            errors={errors}
            required        
          />
          <hr />

          <div
            className='
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              max-h-[50vh]
              overflow-y-auto
            '      
          >
            {/* category가 들어갈 곳 */}
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput 
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>
          <hr />

          {/* 카카오맵 컴포넌트 */}
          <KakaoMap
            setCustomValue={setCustomValue} 
            latitude={latitude} 
            longitude={longitude}
          />
          {/* 이 부분 다시 보기 */}
          <Button 
            label='상품 생성하기'            
          />
        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage