"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTour } from "../../_helpers/actions";
import { routes } from "@/lib/route";
import { z } from "zod";

import { LoadingButton } from "@/components/common/loading-button";
import { TourSchema } from "@/schema";
import { GoBack } from "@/components/common/go-back";
import { Form } from "@/components/ui/form";
import { TourTranslationsExample } from "@/lib/constants";
import { CreateImagesForm } from "./images-form";
import { CreateTranslationsForm } from "./translations-form";
import { CreateDetailsForm } from "./details-form";
import { CreateRelationsForm } from "./relations-form";

type Mutation = {
  banner: File | null;
  thumbnail: File | null;
  data: Data;
};

type Data = z.infer<typeof TourSchema.Create>;

export const CreateTourForm = () => {
  const [banner, setBanner] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const router = useRouter();
  const form = useForm<Data>({
    resolver: zodResolver(TourSchema.Create),
    defaultValues: {
      translations: TourTranslationsExample
    }
  });

  const mutation = useMutation({
    mutationFn: ({ banner, thumbnail, data }: Mutation) => createTour(banner, thumbnail, data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status == 201 && data?.data?.id) {
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
          <CreateRelationsForm form={form} />
          <CreateTranslationsForm form={form} />
          <div className='flex gap-2'>
            <LoadingButton loading={mutation.isPending} type='submit'>
              Submit
            </LoadingButton>
            <GoBack />
          </div>
        </form>
      </Form>
    </div>
  );
};
