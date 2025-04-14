"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { showResponse } from "@/lib/utils"

import { createLimousineImage } from "../../../../_helpers/actions"

import { FileField } from "@/components/common/file-field"
import { Limousine } from "@/types"
import { Form } from "@/components/ui/form"
import { LoadingButton } from "@/components/common/loading-button"

type Props = {
  limousine: Limousine
}

type Mutation = {
  image: File | null
}

export const CreateLimousineImageForm = ({ limousine }: Props) => {
  const [image, setImage] = useState<File | null>(null)
  const [objectURL, setObjectURL] = useState<string | null>("/banner-placeholder.webp")

  const form = useForm()

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createLimousineImage(data.image, limousine.id),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ image })
  }

  useEffect(() => {
    setObjectURL(image ? URL.createObjectURL(image) : "/banner-placeholder.webp")
  }, [image])

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Image</h3>
      {objectURL && <img className='w-96 h-auto max-w-full mb-4 rounded-md object-cover' src={objectURL} alt='Image' />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField accept='image/*' label='Image' onChange={setImage} />
          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  )
}
