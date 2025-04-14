"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { showResponse } from "@/lib/utils"

import { deleteLimousineReview, restoreLimousineReview, updateLimousineReview } from "../../../../_helpers/actions"
import { LimousineReviewSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { LimousineReview } from "@/types"
import { InputField } from "@/components/common/input-field"
import { FileField } from "@/components/common/file-field"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { SelectField } from "@/components/common/select-field"
import { TourItemDeleteModal } from "../../../special-modals/delete-modal"
import { TourItemRestoreModal } from "../../../special-modals/restore-modal"
import { Badge } from "@/components/ui/badge"

import { z } from "zod"

type Props = {
  review: LimousineReview
  limousineId: number
}

type Mutation = {
  data: z.infer<typeof LimousineReviewSchema.Create>
}

export const UpdateLimousineReviewForm = ({ review, limousineId }: Props) => {
  const form = useForm({
    resolver: zodResolver(LimousineReviewSchema.Create),
    defaultValues: review
  })

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateLimousineReview(review.id, data.data),
    onSuccess: (data) => showResponse(data)
  })

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {review.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Review by <b>{review.reviewer_name}</b>
      </h3>

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

          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!review.deleted_at ? <TourItemDeleteModal id={review.id} type='reviews' action={deleteLimousineReview} /> : <TourItemRestoreModal id={review.id} type='reviews' action={restoreLimousineReview} />}
          </div>
        </form>
      </Form>
    </div>
  )
}
