"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTour } from "../../_helpers/actions";
import { routes } from "@/lib/route";
import { z } from "zod";

import { LoadingButton } from "@/components/common/loading-button";

import { TourSchema } from "@/schema";
import { GoBack } from "@/components/common/go-back";
import { Form } from "@/components/ui/form";
import { CreateImagesForm } from "./nested-forms/images-form";
import { CreateTranslationsForm } from "./nested-forms/translations-form";
import { CreateDetailsForm } from "./nested-forms/details-form";
import { CreateRelationsForm } from "./nested-forms/relations-form";
import { Tour, TourType } from "@/types";

type Mutation = {
  banner: File | null;
  thumbnail: File | null;
  data: Data;
};

type Data = z.infer<typeof TourSchema.Create>;

export const UpdateTourDetailsForm = ({ tour }: { tour: Tour }) => {
  const [banner, setBanner] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const router = useRouter();
  const form = useForm<Data>({
    resolver: zodResolver(TourSchema.Create),
    defaultValues: {
      duration: tour.duration,
      availability: tour.availability,
      max_people: tour.max_people,
      price_start: tour.price_start,
      type: tour.type as TourType,
      has_offer: tour.has_offer ? "yes" : "no",
      location_id: tour.location_id,
      pickup_location_id: tour.pickup_location_id,
      category_id: tour.category_id,
      translations: tour.translations
    }
  });

  const mutation = useMutation({
    mutationFn: ({ banner, thumbnail, data }: Mutation) =>
      updateTour(tour.id, banner, thumbnail, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 200 && data?.data?.id) {
          form.reset();
          router.push(routes.tours.edit(data.data.id));
        }
      })
  });

  const onSubmit = () => {
    mutation.mutate({
      banner,
      thumbnail,
      data: form.getValues()
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <CreateImagesForm setBanner={setBanner} setThumbnail={setThumbnail} />
          <CreateDetailsForm form={form} />
          <CreateRelationsForm
            categoryName={tour.category.name}
            pickupLocationName={tour.pickup_location.name}
            locationName={tour.location.name}
            form={form}
          />
          <CreateTranslationsForm form={form} />
          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Save
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  );
};
