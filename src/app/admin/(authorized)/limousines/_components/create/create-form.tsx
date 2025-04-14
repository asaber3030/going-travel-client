"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { createLimousine } from "../../_helpers/actions"
import { routes } from "@/lib/route"
import { z } from "zod"

import { LoadingButton } from "@/components/common/loading-button"
import { LimousineSchema } from "@/schema"
import { GoBack } from "@/components/common/go-back"
import { Form } from "@/components/ui/form"
import { CreateImagesForm } from "./images-form"
import { CreateTranslationsForm } from "./translations-form"
import { CreateDetailsForm } from "./details-form"
import { CreateRelationsForm } from "./relations-form"

type Mutation = {
  data: Data
  file: File | null
}

type Data = z.infer<typeof LimousineSchema.Create>

export const CreateLimousineForm = () => {
  const router = useRouter()
  const form = useForm<Data>({
    resolver: zodResolver(LimousineSchema.Create),
    defaultValues: {
      translations: [
        {
          name: "XYZ",
          description: "XYZ",
          locale: "en"
        },
        {
          name: "XYZ",
          description: "XYZ",
          locale: "ar"
        }
      ]
    }
  })

  const [file, setFile] = useState<File | null>(null)

  const mutation = useMutation({
    mutationFn: ({ data, file }: Mutation) => createLimousine(file, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201 && data?.data?.id) {
          form.reset()
          router.push(routes.limousines.edit(data.data.id))
        }
      })
  })

  const onSubmit = () => {
    mutation.mutate({
      data: form.getValues(),
      file
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <CreateImagesForm setFile={setFile} />
          <CreateDetailsForm form={form} />
          <CreateRelationsForm form={form} />
          <CreateTranslationsForm form={form} />
          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Submit
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  )
}
