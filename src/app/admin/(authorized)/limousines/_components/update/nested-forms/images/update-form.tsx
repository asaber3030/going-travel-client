"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { showResponse } from "@/lib/utils"
import { deleteLimousineImage, restoreLimousineImage, updateLimousineImage } from "../../../../_helpers/actions"

import { LoadingButton } from "@/components/common/loading-button"
import { LimousineImage } from "@/types"
import { FileField } from "@/components/common/file-field"
import { Form } from "@/components/ui/form"
import { TourItemDeleteModal } from "../../../special-modals/delete-modal"
import { TourItemRestoreModal } from "../../../special-modals/restore-modal"
import { Badge } from "@/components/ui/badge"

type Props = {
  limousineImage: LimousineImage
  limousineId: number
}

type Mutation = {
  image: File | null
}

export const UpdateLimousineImageForm = ({ limousineImage, limousineId }: Props) => {
  const [image, setImage] = useState<File | null>(null)
  const [objectURL, setObjectURL] = useState<string | null>(limousineImage.url)

  const form = useForm()

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateLimousineImage(limousineImage.id, limousineId, data.image),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ image })
  }

  useEffect(() => {
    setObjectURL(image ? URL.createObjectURL(image) : limousineImage.url)
  }, [image])

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {limousineImage.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Update Image
      </h3>
      {objectURL && <img className='w-96 h-auto max-w-full mb-4 rounded-md object-cover' src={objectURL} alt='Image' />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Image' onChange={setImage} />
          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!limousineImage.deleted_at ? <TourItemDeleteModal id={limousineImage.id} type='tour-images' action={deleteLimousineImage} /> : <TourItemRestoreModal id={limousineImage.id} type='tour-images' action={restoreLimousineImage} />}
          </div>
        </form>
      </Form>
    </div>
  )
}
