"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { HighlightsLanguagesForm } from "./languages";
import { CreateTourHighlightData, createTourHighlight } from "../../../../_helpers/actions";
import { TourHighlightSchema } from "@/schema";
import { LoadingButton } from "@/components/common/loading-button";
import { FileField } from "@/components/common/file-field";
import { Tour } from "@/types";
import { Form } from "@/components/ui/form";

type Props = {
  tour: Tour;
};

type Mutation = {
  data: CreateTourHighlightData;
  image: File | null;
};

export const CreateTourHighlightForm = ({ tour }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(TourHighlightSchema)
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createTourHighlight(tour.id, data.image, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Highlight</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Highlight Image' onChange={setImage} />
          <HighlightsLanguagesForm form={form} />
          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  );
};
