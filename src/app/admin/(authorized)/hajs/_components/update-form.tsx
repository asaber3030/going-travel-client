"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { updateHaj } from "../_helpers/actions"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { routes } from "@/lib/route"
import { z } from "zod"

import { HajSchema } from "@/schema"
import { Form } from "@/components/ui/form"
import { FileField } from "@/components/common/file-field"
import { LoadingButton } from "@/components/common/loading-button"
import { Category, CategoryTranslation } from "@/types"
import { LanguagesForm } from "../../_components/languages-form"
import { InputField } from "@/components/common/input-field"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"

type Data = z.infer<typeof HajSchema>

type Mutation = {
  banner: File | null
  thumbnail: File | null
  data: Data
}

type Props = {
  haj: any
  id: number
}

export const UpdateCategoryForm = ({ haj, id }: Props) => {
  const [banner, setBanner] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const form = useForm<Data>({
    resolver: zodResolver(HajSchema),
    defaultValues: haj
  })
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: ({ banner, thumbnail, data }: Mutation) => updateHaj(id, banner, thumbnail, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201 && data?.data?.id) {
          router.push(routes.categories.show(data.data.id))
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
          <InputField name='depature_date' label='Departure Date' control={form.control} type='date' />
          <InputField name='return_date' label='Return Date' control={form.control} type='date' />
          <InputField name='notes' label='Notes' control={form.control} />
          <SelectField name='type' label='Type' control={form.control} defaultValue={haj?.type}>
            <SelectItem value='direct'>حج مباشر</SelectItem>
            <SelectItem value='luck'>حج قرعة</SelectItem>
            <SelectItem value='omrah'>عمرة</SelectItem>
          </SelectField>
          <InputField name='transportation_type' label='Transportation Type' control={form.control} />
          <InputField name='hotel' label='Hotel' control={form.control} />

          <LoadingButton loading={mutation.isPending} type='submit' className='mt-4'>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  )
}
