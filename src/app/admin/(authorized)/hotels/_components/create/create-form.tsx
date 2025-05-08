"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { createHotel, CreateHotelData } from "../../_helpers/actions"

import { LoadingButton } from "@/components/common/loading-button"
import { HotelSchema } from "@/schema"
import { GoBack } from "@/components/common/go-back"
import { Form } from "@/components/ui/form"
import { CreateTranslationsForm } from "./translations-form"
import { CreateDetailsForm } from "./details-form"
import { CreateRelationsForm } from "./relations-form"
import { FileField } from "@/components/common/file-field"
import { CreateAmenityForm } from "./amenity-form"

type Mutation = {
  data: CreateHotelData
  thumbnail: File | null
  banner: File | null
}

export const CreateHotelForm = () => {
  const router = useRouter()
  const form = useForm<CreateHotelData>({
    resolver: zodResolver(HotelSchema)
  })

  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [banner, setBanner] = useState<File | null>(null)

  const mutation = useMutation({
    mutationFn: ({ data, thumbnail, banner }: Mutation) => createHotel(thumbnail, banner, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201 && data?.data?.id) {
          //form.reset()
          //router.push(routes.hotels.edit(data.data.id))
        }
      })
  })

  const onSubmit = () => {
    console.log(form.getValues())
    mutation.mutate({
      data: form.getValues(),
      banner,
      thumbnail
    })
  }

  const showErrors = () => {
    console.log(form.formState.errors)
  }

  return (
    <div>
      {/* <Button onClick={showErrors}>show</Button> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FileField onChange={setThumbnail} label='Thumbnail' />
          <FileField onChange={setBanner} label='Banner' />

          <CreateDetailsForm form={form} />
          <CreateAmenityForm form={form} />
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
