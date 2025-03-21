"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { TourItinerarySchema } from "@/schema";
import { Tour, Itinerary } from "@/types";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/input-field";
import { ItinerariesLanguagesForm } from "./itineraries-languages";
import { showResponse } from "@/lib/utils";
import {
  CreateTourItieraryData,
  deleteTourItem,
  restoreTourItem,
  updateTourItinerary
} from "../../../../_helpers/actions";
import { FileField } from "@/components/common/file-field";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingButton } from "@/components/common/loading-button";
import { TourItemDeleteModal } from "../../../special-modals/delete-modal";
import { TourItemRestoreModal } from "../../../special-modals/restore-modal";
import { Badge } from "@/components/ui/badge";

type Props = {
  itinerary: Itinerary;
  tourId: number;
};

type Mutation = {
  data: CreateTourItieraryData;
  image: File | null;
};

export const UpdateTourItinerariesForm = ({ itinerary, tourId }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(TourItinerarySchema),
    defaultValues: itinerary
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) =>
      updateTourItinerary(itinerary.id, tourId, data.image, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {itinerary.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Day Number <b>#{itinerary.day_number}</b>
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Itinerary Image' onChange={setImage} />

          <div className='grid gap-4 xl:grid-cols-3 grid-cols-1'>
            <InputField control={form.control} name={`meals`} label='Meals' />
            <InputField
              control={form.control}
              valueAsNumber
              type='number'
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
          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!itinerary.deleted_at ? (
              <TourItemDeleteModal
                id={itinerary.id}
                type='tour-itineraries'
                action={deleteTourItem}
              />
            ) : (
              <TourItemRestoreModal
                id={itinerary.id}
                type='tour-itineraries'
                action={restoreTourItem}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
