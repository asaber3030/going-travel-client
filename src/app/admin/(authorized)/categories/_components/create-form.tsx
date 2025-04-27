"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { createCategory } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { CategorySchema } from "@/schema"
import { Form } from "@/components/ui/form"
import { FileField } from "@/components/common/file-field"
import { LoadingButton } from "@/components/common/loading-button"
import { LanguagesForm } from "../../_components/languages-form"
import { routes } from "@/lib/route"

type Mutation = {
  file: File | null
  data: Data
}

type Data = z.infer<typeof CategorySchema.Create>

export const CreateCategoryForm = () => {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<Data>({
    resolver: zodResolver(CategorySchema.Create)
  })
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: ({ file, data }: Mutation) => createCategory(file, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201 && data?.data?.id) {
          form.reset()
          router.push(routes.categories.show(data?.data?.id))
        }
      })
  })

  const onSubmit = () => {
    mutation.mutate({
      file,
      data: form.getValues()
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FileField label='Image' onChange={setFile} />
          <LanguagesForm form={form} />
          <LoadingButton loading={mutation.isPending} type='submit' className='mt-4'>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}
