"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { showResponse } from "@/lib/utils";

import {
  CreateTourReviewData,
  deleteTourItem,
  restoreTourItem,
  updateTourReview
} from "../../../../_helpers/actions";
import { TourReviewSchema } from "@/schema";
import { LoadingButton } from "@/components/common/loading-button";
import { Review } from "@/types";
import { InputField } from "@/components/common/input-field";
import { FileField } from "@/components/common/file-field";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { SelectField } from "@/components/common/select-field";
import { TourItemDeleteModal } from "../../../special-modals/delete-modal";
import { TourItemRestoreModal } from "../../../special-modals/restore-modal";
import { Badge } from "@/components/ui/badge";

type Props = {
  review: Review;
  tourId: number;
};

type Mutation = {
  data: CreateTourReviewData;
  image: File | null;
};

export const UpdateTourReviewForm = ({ review, tourId }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [objectURL, setObjectURL] = useState<string | null>(review.image);

  const form = useForm({
    resolver: zodResolver(TourReviewSchema),
    defaultValues: review
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateTourReview(review.id, tourId, data.image, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  useEffect(() => {
    setObjectURL(image ? URL.createObjectURL(image) : review.image);
  }, [image]);

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {review.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Review by <b>{review.client_name}</b>
      </h3>
      {objectURL && (
        <img
          className='w-96 h-auto max-w-full mb-4 rounded-md object-cover'
          src={objectURL}
          alt='Image'
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Itinerary Image' onChange={setImage} />

          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <InputField control={form.control} name='client_name' label='Client Name' />

            <SelectField
              defaultValue={review.rating.toString()}
              name='rating'
              control={form.control}
              label='Rating'
              valueAsNumber
            >
              <SelectItem value='1'>1</SelectItem>
              <SelectItem value='2'>2</SelectItem>
              <SelectItem value='3'>3</SelectItem>
              <SelectItem value='4'>4</SelectItem>
              <SelectItem value='5'>5</SelectItem>
            </SelectField>

            <InputField control={form.control} name='title' label='Title' />
            <div className='col-span-2'>
              <InputField control={form.control} name='description' label='Message' isTextarea />
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!review.deleted_at ? (
              <TourItemDeleteModal id={review.id} type='reviews' action={deleteTourItem} />
            ) : (
              <TourItemRestoreModal id={review.id} type='reviews' action={restoreTourItem} />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
