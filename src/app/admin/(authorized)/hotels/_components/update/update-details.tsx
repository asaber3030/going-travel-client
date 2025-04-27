"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateHotelData, updateHotel } from "../../_helpers/actions"

import { LoadingButton } from "@/components/common/loading-button"
import { UpdateHotelSchema } from "@/schema"
import { GoBack } from "@/components/common/go-back"
import { Form } from "@/components/ui/form"
import { UpdateTranslationsForm } from "./nested-forms/translations-form"
import { UpdateDetailsForm } from "./nested-forms/details-form"
import { UpdateRelationsForm } from "./nested-forms/relations-form"
import { FileField } from "@/components/common/file-field"
import { UpdateAmenityForm } from "./nested-forms/amenity-form"

type Mutation = {
  banner: File | null
  thumbnail: File | null
  data: CreateHotelData
}

export const UpdateHotelDetailsForm = ({ hotel }: { hotel: any }) => {
  const [banner, setBanner] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const router = useRouter()
  const form = useForm<CreateHotelData>({
    resolver: zodResolver(UpdateHotelSchema),
    defaultValues: hotel
  })

  const mutation = useMutation({
    mutationFn: ({ banner, thumbnail, data }: Mutation) => updateHotel(hotel.id, thumbnail, banner, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 200 && data?.data?.id) {
          //form.reset()
          //router.push(routes.limousines.edit(data.data.id))
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

  const onError = () => {
    console.error(form.formState.errors)
  }

  return (
    <div>
      {/* <button onClick={onError}>errors</button> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FileField onChange={setBanner} label='Banner' />
          <FileField onChange={setThumbnail} label='Thumbnail' />

          <UpdateDetailsForm form={form} />
          {/* <UpdateAmenityForm form={form} amenity={hotel.amenity} /> */}
          <UpdateRelationsForm categoryName={hotel.category.name} locationName={hotel.location.name} form={form} />
          <UpdateTranslationsForm form={form} />

          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Save
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  )
}
