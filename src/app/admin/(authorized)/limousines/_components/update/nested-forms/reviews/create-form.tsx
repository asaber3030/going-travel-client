"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import { showResponse } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"

import { createLimousineReview } from "../../../../_helpers/actions"
import { LimousineReviewSchema } from "@/schema"
import { InputField } from "@/components/common/input-field"
import { FileField } from "@/components/common/file-field"
import { Limousine } from "@/types"
import { Form } from "@/components/ui/form"
import { LoadingButton } from "@/components/common/loading-button"
import { SelectItem } from "@/components/ui/select"
import { SelectField } from "@/components/common/select-field"

import { z } from "zod"

type Props = {
  limousine: Limousine
}

type Mutation = {
  data: z.infer<typeof LimousineReviewSchema.Create>
}

export const CreateLimousineReviewForm = ({ limousine }: Props) => {
  const form = useForm({
    resolver: zodResolver(LimousineReviewSchema.Create)
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createLimousineReview(limousine.id, data.data),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Review</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <InputField control={form.control} name='reviewer_name' label='Reviwer Name' />
            <SelectField name='rating' control={form.control} label='Rating' valueAsNumber>
              <SelectItem value='1'>1</SelectItem>
              <SelectItem value='2'>2</SelectItem>
              <SelectItem value='3'>3</SelectItem>
              <SelectItem value='4'>4</SelectItem>
              <SelectItem value='5'>5</SelectItem>
            </SelectField>
            <div className='col-span-2'>
              <InputField control={form.control} name='comment' label='Message' isTextarea />
            </div>
          </div>

          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  )
}
