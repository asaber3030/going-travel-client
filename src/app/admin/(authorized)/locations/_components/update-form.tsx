"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { createLocation, updateLocation } from "../_helpers/actions"

import { Form } from "@/components/ui/form"
import { FileField } from "@/components/common/file-field"
import { LocationSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { GoBack } from "@/components/common/go-back"
import { Location } from "@/types"

type Data = z.infer<typeof LocationSchema.Update>

type Mutation = {
  file: File | null
  data: Data
}

export const UpdateLocationForm = ({ location }: { location: Location }) => {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm({
    resolver: zodResolver(LocationSchema.Update),
    defaultValues: location
  })

  const mutation = useMutation({
    mutationFn: ({ file, data }: Mutation) => updateLocation(location.id, file, data),
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
            Save
          </LoadingButton>
          <GoBack />
        </div>
      </form>
    </Form>
  )
}
