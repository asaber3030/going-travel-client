"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { createLimousineFeature } from "../../../../_helpers/actions"
import { LimousineFeatureSchema } from "@/schema"
import { InputField } from "@/components/common/input-field"
import { Limousine } from "@/types"
import { Form } from "@/components/ui/form"
import { LoadingButton } from "@/components/common/loading-button"

import { z } from "zod"
import { LanguagesSelect } from "@/app/admin/(authorized)/_components/languages-select"

type Props = {
  limousine: Limousine
}

type Mutation = {
  data: z.infer<typeof LimousineFeatureSchema.Create>
}

export const CreateLimousineFeatureForm = ({ limousine }: Props) => {
  const form = useForm({
    resolver: zodResolver(LimousineFeatureSchema.Create)
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createLimousineFeature(limousine.id, data.data),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Feature</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <div className='col-span-2'>
              <LanguagesSelect form={form} />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='vehicle_features' label='Vehicle Features' isTextarea />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='additional_info' label='Additional Info' isTextarea />
            </div>
          </div>

          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  )
}
