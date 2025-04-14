"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { showResponse } from "@/lib/utils"

import { deleteLimousineFeature, restoreLimousineFeature, updateLimousineFeature } from "../../../../_helpers/actions"
import { LimousineFeatureSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { LimousineFeature } from "@/types"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"

import { TourItemDeleteModal } from "../../../special-modals/delete-modal"
import { TourItemRestoreModal } from "../../../special-modals/restore-modal"
import { Badge } from "@/components/ui/badge"

import { z } from "zod"
import { LanguagesSelect } from "@/app/admin/(authorized)/_components/languages-select"

type Props = {
  feature: LimousineFeature
}

type Mutation = {
  data: z.infer<typeof LimousineFeatureSchema.Create>
}

export const UpdateLimousineFeatureForm = ({ feature }: Props) => {
  const form = useForm({
    resolver: zodResolver(LimousineFeatureSchema.Create),
    defaultValues: feature
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateLimousineFeature(feature.id, data.data),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {feature.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Feature <b>#{feature.id}</b>
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <div className='col-span-2'>
              <LanguagesSelect defaultValue={feature.locale} form={form} />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='vehicle_features' label='Vehicle Features' isTextarea />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='additional_info' label='Additional Info' isTextarea />
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!feature.deleted_at ? <TourItemDeleteModal id={feature.id} type='reviews' action={deleteLimousineFeature} /> : <TourItemRestoreModal id={feature.id} type='reviews' action={restoreLimousineFeature} />}
          </div>
        </form>
      </Form>
    </div>
  )
}
