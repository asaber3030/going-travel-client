"use client"

import { useForm } from "react-hook-form"
import { useAuth } from "@/hooks/use-auth"

import { z } from "zod"
import { loginSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { InputField } from "@/components/common/input-field"
import { LoadingButton } from "@/components/common/loading-button"
import { CheckboxField } from "@/components/common/checkbox-field"

export const LoginForm = () => {
  const { login, isLoading } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
    /* defaultValues: {
      email: "a@a.com",
      password: "0552320541",
      rememeberMe: false
    } */
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values)
  }

  return (
    <div className='flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-12 lg:px-20'>
      <div className='mx-auto w-full max-w-md space-y-8'>
        <div className='space-y-2 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>Welcome back</h1>
          <p className='text-muted-foreground'>Enter your credentials to access Going travel dashboard</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <InputField control={form.control} label='Email' placeholder='Enter your email' name='email' />

            <InputField control={form.control} label='Password' placeholder='Enter your password' name='password' type={"password"} />

            <CheckboxField control={form.control} label='Remember me' name='rememeberMe' />

            <LoadingButton className='w-full' loading={isLoading} type='submit'>
              Login
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  )
}
