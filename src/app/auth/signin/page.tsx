'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const SigninPage = () => {
  const [isLoading, setIsLoading] = useState(false)  
  const { register, handleSubmit, formState: {
    errors
  }} = useForm<FieldValues>({
    defaultValues: {      
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    setIsLoading(true)
    try {
      const data = signIn('credentials', body)
      console.log('data', data)      
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center gap-4 min-w-[350px]'
      >
        <h1 className='text-2xl'>Sign In</h1>
        <Input 
          id='email'
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />    
        <Input 
          id='password'
          label='Password'
          type='password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Button
          label='Sign In'
        />
        <div className='text-center'>
          <p className='text-gray-400'>
            Not a member?{"  "}
            <Link href='/auth/register' className='text-black hover:underline'>
              REGISTER
            </Link>
          </p>
        </div>
      </form>
    </section>
  )
}

export default SigninPage