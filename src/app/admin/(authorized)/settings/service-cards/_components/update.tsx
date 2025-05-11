"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { updateServiceCardById } from "../../_helpers/actions"

import { Form } from "@/components/ui/form"
import { FileField } from "@/components/common/file-field"
import { ServiceCardSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"

import { TServiceCard } from "@/types"
import { LanguagesForm } from "../../../_components/languages-form"
import { CheckboxField } from "@/components/common/checkbox-field"
import { InputField } from "@/components/common/input-field"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import { toast } from "react-toastify"

type Props = {
  card: TServiceCard
}

export const UpdateServiceCard = ({ card }: Props) => {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm({
    resolver: zodResolver(ServiceCardSchema.Create),
    defaultValues: {
      ...card,
      enabled: card.enabled ? "yes" : "no"
    }
  })

  const mutation = useMutation({
    mutationFn: ({ file, data }: any) => updateServiceCardById(card.id, data, file),
    onSuccess: (data: any) => toast.success("Service Card updated successfully"),
    onError: (error) => toast.error(error?.message || "Something went wrong")
  })

  const onSubmit = () => {
    console.log(form.getValues())
    mutation.mutate({ file, data: form.getValues() })
  }

  const onError = () => {
    const errors = form.formState.errors
    console.log(errors)
  }

  return (
    <Form {...form}>
      <button type='button' onClick={onError}>
        show
      </button>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FileField label='Image' onChange={setFile} />
        <InputField name='key' label='Key' control={form.control} />
        <InputField name='url' label='URL' control={form.control} />
        <SelectField name='enabled' control={form.control} label='enabled' defaultValue={card.enabled ? "yes" : "no"}>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <LanguagesForm titleOrName='title' form={form} />
        <LoadingButton loading={mutation.isPending} type='submit' className='mt-4'>
          Submit
        </LoadingButton>
      </form>
    </Form>
  )
}
