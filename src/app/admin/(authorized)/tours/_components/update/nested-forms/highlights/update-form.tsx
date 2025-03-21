"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateTourHighlightData,
  deleteTourItem,
  restoreTourItem,
  updateTourHighlight
} from "../../../../_helpers/actions";
import { HighlightsLanguagesForm } from "./languages";
import { TourHighlightSchema } from "@/schema";
import { LoadingButton } from "@/components/common/loading-button";
import { FileField } from "@/components/common/file-field";
import { Highlight } from "@/types";
import { Form } from "@/components/ui/form";
import { TourItemDeleteModal } from "../../../special-modals/delete-modal";
import { TourItemRestoreModal } from "../../../special-modals/restore-modal";
import { Badge } from "@/components/ui/badge";

type Props = {
  highlight: Highlight;
  tourId: number;
};

type Mutation = {
  data: CreateTourHighlightData;
  image: File | null;
};

export const UpdateTourHighlightForm = ({ highlight, tourId }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(TourHighlightSchema),
    defaultValues: {
      translations: highlight.translations
    }
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) =>
      updateTourHighlight(highlight.id, tourId, data.image, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold flex gap-2'>
        {highlight.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        Highlight <b>{highlight.title}</b>
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FileField label='Highlight Image' onChange={setImage} />
          <HighlightsLanguagesForm form={form} />
          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!highlight.deleted_at ? (
              <TourItemDeleteModal
                id={highlight.id}
                type='tour-highlights'
                action={deleteTourItem}
              />
            ) : (
              <TourItemRestoreModal
                id={highlight.id}
                type='tour-highlights'
                action={restoreTourItem}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
