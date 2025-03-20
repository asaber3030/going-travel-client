"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectField } from "@/components/common/select-field";
import { InputField } from "@/components/common/input-field";
import { SelectItem } from "@/components/ui/select";

type Props = {
  form: any;
};

export const CreateDetailsForm = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>

      <CardContent className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
        <InputField
          label='Avilability Label'
          placeholder='All year'
          name='availability'
          control={form.control}
        />

        <InputField
          label='Duration (in days)'
          placeholder='5'
          name='duration'
          type='number'
          valueAsNumber
          control={form.control}
        />

        <InputField
          label='Max People'
          placeholder='5'
          name='max_people'
          type='number'
          valueAsNumber
          control={form.control}
        />

        <InputField
          label='Price Start'
          placeholder='500'
          name='price_start'
          type='number'
          valueAsNumber
          control={form.control}
        />

        <SelectField name='type' label='Type' control={form.control}>
          <SelectItem value='private'>Private</SelectItem>
          <SelectItem value='public'>Public</SelectItem>
        </SelectField>
      </CardContent>
    </Card>
  );
};
