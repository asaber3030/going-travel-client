"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateTourExclusionData,
  deleteTourItem,
  restoreTourItem,
  updateTourExclusion
} from "../../../../_helpers/actions";
import { ExclusionsLanguagesForm } from "./languages";
import { TourExclusionSchema } from "@/schema";
import { LoadingButton } from "@/components/common/loading-button";
import { Exclusion, ExclusionType } from "@/types";
import { Form } from "@/components/ui/form";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";
import { TourItemDeleteModal } from "../../../special-modals/delete-modal";
import { TourItemRestoreModal } from "../../../special-modals/restore-modal";
import { Badge } from "@/components/ui/badge";

type Props = {
  exclusion: Exclusion;
  tourId: number;
};

type Mutation = {
  data: CreateTourExclusionData;
};

export const UpdateTourExclusionForm = ({ exclusion, tourId }: Props) => {
  const form = useForm({
    resolver: zodResolver(TourExclusionSchema),
    defaultValues: {
      type: exclusion.type as ExclusionType,
      translations: exclusion.translations
    }
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) => updateTourExclusion(exclusion.id, tourId, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() });
  };

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold capitalize flex gap-2'>
        {exclusion.deleted_at && <Badge variant='outline-desctructive'>Trashed</Badge>}
        {exclusion.type} - <b>{exclusion.title}</b>
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <SelectField
            defaultValue={exclusion.type}
            name='type'
            label='Type'
            control={form.control}
          >
            <SelectItem value='inclusion'>Inclusion</SelectItem>
            <SelectItem value='exclusion'>Exclusion</SelectItem>
          </SelectField>
          <ExclusionsLanguagesForm form={form} />
          <div className='flex gap-2 items-center'>
            <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
            {!exclusion.deleted_at ? (
              <TourItemDeleteModal
                id={exclusion.id}
                type='tour-inclusions-exclusions'
                action={deleteTourItem}
              />
            ) : (
              <TourItemRestoreModal
                id={exclusion.id}
                type='tour-inclusions-exclusions'
                action={restoreTourItem}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
