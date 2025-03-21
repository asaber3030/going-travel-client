"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateTourReviewData, createTourReview } from "../../../../_helpers/actions";
import { TourReviewSchema } from "@/schema";
import { InputField } from "@/components/common/input-field";
import { FileField } from "@/components/common/file-field";
import { Tour } from "@/types";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/common/loading-button";
import { SelectItem } from "@/components/ui/select";
import { SelectField } from "@/components/common/select-field";

type Props = {
  tour: Tour;
};

type Mutation = {
  data: CreateTourReviewData;
  image: File | null;
};

export const CreateTourReviewForm = ({ tour }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [objectURL, setObjectURL] = useState<string | null>("/banner-placeholder.webp");

  const form = useForm({
    resolver: zodResolver(TourReviewSchema)
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createTourReview(tour.id, data.image, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  useEffect(() => {
    setObjectURL(image ? URL.createObjectURL(image) : "/banner-placeholder.webp");
  }, [image]);

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Review</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Review Image Or Client Image' onChange={setImage} />
          {objectURL && (
            <img
              className='w-96 h-auto max-w-full mb-4 rounded-md object-cover'
              src={objectURL}
              alt='Image'
            />
          )}
          <div className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
            <InputField control={form.control} name='client_name' label='Client Name' />

            <SelectField name='rating' control={form.control} label='Rating' valueAsNumber>
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

          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  );
};
