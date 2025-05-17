"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { UserSchema } from "@/schema"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Plus } from "lucide-react"

import { showResponse } from "@/lib/utils"
import { createUser } from "../_helpers/actions"
import { z } from "zod"
import { toast } from "react-toastify"

export const CreateUserModal = () => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(UserSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof UserSchema>) => createUser(data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 201) {
          setModal(false)
          form.reset()
        }
      }),
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleCreate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Plus}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' />
            <InputField control={form.control} name='email' label='E-mail' />
            <InputField control={form.control} name='password' label='Password' type='password' />
            <LoadingButton loading={mutation.isPending}>Create</LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
