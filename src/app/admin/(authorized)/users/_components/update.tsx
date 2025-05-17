"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { LoadingButton } from "@/components/common/loading-button"
import { UserUpdateSchema } from "@/schema"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Edit } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { updateUser } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { z } from "zod"
import { User } from "@/types/index"
import { toast } from "react-toastify"

export const UpdateUserModal = ({ user }: { user: User }) => {
  const [modal, setModal] = useState(false)

  const form = useForm({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: ""
    }
  })

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof UserUpdateSchema>) => updateUser(user.id, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) setModal(false)
      }),
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleUpdate = () => {
    mutation.mutate(form.getValues())
  }

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button icon={Edit} variant='outline' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update User - <b>{user.name}</b>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
            <InputField control={form.control} name='name' label='Name' defaultValue={user.name} />
            <InputField control={form.control} name='email' label='E-mail' defaultValue={user.email} />
            <InputField control={form.control} name='password' label='Password' type='password' />
            <LoadingButton loading={mutation.isPending}>Update</LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
