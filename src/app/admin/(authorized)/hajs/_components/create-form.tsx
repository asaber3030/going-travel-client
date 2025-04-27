"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { createHaj } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { HajSchema } from "@/schema"
import { Form } from "@/components/ui/form"
import { FileField } from "@/components/common/file-field"
import { LoadingButton } from "@/components/common/loading-button"
import { LanguagesForm } from "../../_components/languages-form"
import { routes } from "@/lib/route"
import { InputField } from "@/components/common/input-field"

type Mutation = {
  banner: File | null
  thumbnail: File | null
  data: Data
}

type Data = z.infer<typeof HajSchema>

export const CreateHajForm = () => {
  const [banner, setBanner] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const form = useForm<Data>({
    resolver: zodResolver(HajSchema)
  })
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: ({ banner, thumbnail, data }: Mutation) => createHaj(banner, thumbnail, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201 && data?.data?.id) {
          //form.reset()
          //router.push(routes.categories.show(data?.data?.id))
        }
      })
  })

  const onSubmit = () => {
    mutation.mutate({
      banner,
      thumbnail,
      data: form.getValues()
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FileField label='Banner' onChange={setBanner} />
          <FileField label='Thumbnail' onChange={setThumbnail} />

          <InputField name='title' label='Title' control={form.control} />
          <InputField name='description' label='Description' control={form.control} />
          <InputField name='long_description' label='Long Description' control={form.control} />
          <InputField name='price' label='Price' control={form.control} valueAsNumber />
          <InputField name='cautions' label='Cautions' control={form.control} />
          <InputField name='short_description' label='Short Description' control={form.control} />
          <InputField name='depature_date' label='Departure Date' control={form.control} type='date' />
          <InputField name='return_date' label='Return Date' control={form.control} type='date' />
          <InputField name='notes' label='Notes' control={form.control} />
          <InputField name='meals' label='Meals' control={form.control} />
          <InputField name='transportation_type' label='Transportation Type' control={form.control} />
          <InputField name='hotel' label='Hotel' control={form.control} />
          <InputField name='map_url' label='Map URL' control={form.control} />

          <LoadingButton loading={mutation.isPending} type='submit' className='mt-4'>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}
