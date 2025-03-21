"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExclusionsLanguagesForm } from "./languages";
import { CreateTourExclusionData, createTourExclusion } from "../../../../_helpers/actions";
import { TourExclusionSchema } from "@/schema";
import { LoadingButton } from "@/components/common/loading-button";
import { Tour } from "@/types";
import { Form } from "@/components/ui/form";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";

type Props = {
  tour: Tour;
};

type Mutation = {
  data: CreateTourExclusionData;
};

export const CreateTourExclusionForm = ({ tour }: Props) => {
  const form = useForm({
    resolver: zodResolver(TourExclusionSchema)
  });

  const mutation = useMutation({
    mutationFn: (data: Mutation) => createTourExclusion(tour.id, data.data),
    onSuccess: (data) => showResponse(data)
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues() });
  };

  return (
    <div className='p-4 rounded-md bg-white border shadow-xs'>
      <h3 className='border-b pb-1 mb-4 text-lg font-bold'>Create New Exclusion Or Inclusion</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <SelectField name='type' label='Type' control={form.control}>
            <SelectItem value='inclusion'>Inclusion</SelectItem>
            <SelectItem value='exclusion'>Exclusion</SelectItem>
          </SelectField>
          <ExclusionsLanguagesForm form={form} />
          <LoadingButton loading={mutation.isPending}>Save</LoadingButton>
        </form>
      </Form>
    </div>
  );
};
