"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createLocation } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { LocationSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { FileField } from "@/components/common/file-field"
import { GoBack } from "@/components/common/go-back"
import { Form } from "@/components/ui/form"

type Data = z.infer<typeof LocationSchema.Create>

type Mutation = {
  file: File | null
  data: Data
}

export const CreateLocationForm = () => {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm({
    resolver: zodResolver(LocationSchema.Create),
    defaultValues: {
      name: ""
    }
  })

  const mutation = useMutation({
    mutationFn: ({ file, data }: Mutation) => createLocation(data, file),
    onSuccess: (data) => showResponse(data)
  })

  const onSubmit = () => {
    mutation.mutate({ file, data: form.getValues() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <InputField name='name' label='Name' control={form.control} />
        <FileField label='Image' onChange={setFile} />
        <div className='flex gap-2'>
          <LoadingButton loading={mutation.isPending} className='w-fit'>
            Create
          </LoadingButton>
          <GoBack />
        </div>
      </form>
    </Form>
  )
}
