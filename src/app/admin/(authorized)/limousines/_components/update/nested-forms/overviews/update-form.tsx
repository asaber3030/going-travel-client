"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { showResponse } from "@/lib/utils"

import { deleteLimousineOverview, restoreLimousineOverview, updateLimousineOverview } from "../../../../_helpers/actions"
import { LimousineOverviewSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { LimousineOverview } from "@/types"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"

import { TourItemDeleteModal } from "../../../special-modals/delete-modal"
import { TourItemRestoreModal } from "../../../special-modals/restore-modal"
import { Badge } from "@/components/ui/badge"

import { z } from "zod"
import { LanguagesSelect } from "@/app/admin/(authorized)/_components/languages-select"

type Props = {
  overview: LimousineOverview
}

type Mutation = {
  data: z.infer<typeof LimousineOverviewSchema.Create>
}

export const UpdateLimousineOverviewForm = ({ overview }: Props) => {
  const form = useForm({
    resolver: zodResolver(LimousineOverviewSchema.Create),
    defaultValues: overview
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateLimousineOverview(overview.id, data.data),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {overview.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Overview <b>#{overview.id}</b>
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <div className='col-span-2'>
              <LanguagesSelect form={form} />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='about_vehicle' label='About Vehicle' isTextarea />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='key_features' label='Key Features' isTextarea />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='available_services' label='Available Services' isTextarea />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='pricing' label='Pricing' />
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!overview.deleted_at ? <TourItemDeleteModal id={overview.id} type='reviews' action={deleteLimousineOverview} /> : <TourItemRestoreModal id={overview.id} type='reviews' action={restoreLimousineOverview} />}
          </div>
        </form>
      </Form>
    </div>
  )
}
