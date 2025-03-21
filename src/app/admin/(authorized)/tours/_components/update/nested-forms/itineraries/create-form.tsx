"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { ItinerariesLanguagesForm } from "./itineraries-languages";
import { CreateTourItieraryData, createTourItinerary } from "../../../../_helpers/actions";
import { TourItinerarySchema } from "@/schema";
import { InputField } from "@/components/common/input-field";
import { FileField } from "@/components/common/file-field";
import { Tour } from "@/types";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "@/components/common/loading-button";

type Props = {
  tour: Tour;
};

type Mutation = {
  data: CreateTourItieraryData;
  image: File | null;
};

export const CreateTourItineraryForm = ({ tour }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(TourItinerarySchema)
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createTourItinerary(tour.id, data.image, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Itinerary</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Itinerary Image' onChange={setImage} />

          <div className='grid gap-4 xl:grid-cols-3 grid-cols-1'>
            <InputField control={form.control} name={`meals`} label='Meals' />
            <InputField
              valueAsNumber
              type='number'
              control={form.control}
              name={`day_number`}
              label='Day Number'
            />
            <InputField
              control={form.control}
              name={`overnight_location`}
              label='Overnight Location'
            />
          </div>
          <ItinerariesLanguagesForm form={form} />
          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  );
};
