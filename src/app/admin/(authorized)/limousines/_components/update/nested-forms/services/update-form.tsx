"use client"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { showResponse } from "@/lib/utils"

import { deleteLimousineService, restoreLimousineService, updateLimousineService } from "../../../../_helpers/actions"
import { LimousineServiceSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { LimousineService } from "@/types"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"

import { TourItemDeleteModal } from "../../../special-modals/delete-modal"
import { TourItemRestoreModal } from "../../../special-modals/restore-modal"
import { Badge } from "@/components/ui/badge"

import { z } from "zod"
import { LanguagesSelect } from "@/app/admin/(authorized)/_components/languages-select"

type Props = {
  service: LimousineService
}

type Mutation = {
  data: z.infer<typeof LimousineServiceSchema.Create>
}

export const UpdateLimousineServiceForm = ({ service }: Props) => {
  const form = useForm({
    resolver: zodResolver(LimousineServiceSchema.Create),
    defaultValues: service
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateLimousineService(service.id, data.data),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {service.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Service <b>#{service.id}</b>
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <div className='col-span-2'>
              <LanguagesSelect defaultValue={service.locale} form={form} />
            </div>

            <div className='col-span-2'>
              <InputField control={form.control} name='our_services' label='Our Services' isTextarea />
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!service.deleted_at ? <TourItemDeleteModal id={service.id} type='reviews' action={deleteLimousineService} /> : <TourItemRestoreModal id={service.id} type='reviews' action={restoreLimousineService} />}
          </div>
        </form>
      </Form>
    </div>
  )
}
