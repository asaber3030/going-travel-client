"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateLimousine } from "../../_helpers/actions"
import { routes } from "@/lib/route"
import { z } from "zod"

import { LoadingButton } from "@/components/common/loading-button"
import { LimousineSchema } from "@/schema"
import { GoBack } from "@/components/common/go-back"
import { Form } from "@/components/ui/form"
import { CreateImagesForm } from "./nested-forms/images-form"
import { CreateTranslationsForm } from "./nested-forms/translations-form"
import { CreateDetailsForm } from "./nested-forms/details-form"
import { CreateRelationsForm } from "./nested-forms/relations-form"
import { Limousine } from "@/types"

type Mutation = {
  file: File | null
  data: Data
}

type Data = z.infer<typeof LimousineSchema.Create>

export const UpdateLimousineDetailsForm = ({ limousine }: { limousine: Limousine }) => {
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()
  const form = useForm<Data>({
    resolver: zodResolver(LimousineSchema.Create),
    defaultValues: {
      type: limousine.type,
      price_per_hour: limousine.price_per_hour,
      max_passengers: limousine.max_passengers,
      location_id: limousine.location_id,
      category_id: limousine.category_id,
      translations: limousine.translations
    }
  })

  const mutation = useMutation({
    mutationFn: ({ file, data }: Mutation) => updateLimousine(limousine.id, file, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 200 && data?.data?.id) {
          form.reset()
          router.push(routes.limousines.edit(data.data.id))
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
          <CreateImagesForm setFile={setFile} />
          <CreateDetailsForm form={form} />
          <CreateRelationsForm categoryName={limousine.category.name} locationName={limousine.location.name} form={form} />
          <CreateTranslationsForm form={form} />
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
