"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SelectField } from "@/components/common/select-field"
import { InputField } from "@/components/common/input-field"
import { SelectItem } from "@/components/ui/select"

type Props = {
  form: any
}

export const CreateDetailsForm = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>

      <CardContent className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
        <InputField label='Max Passengers' placeholder='10' name='max_passengers' valueAsNumber control={form.control} />
        <InputField label='Type' placeholder='5' name='type' type='text' control={form.control} />
        <InputField label='Price Per Hour' placeholder='500' name='price_per_hour' type='number' valueAsNumber control={form.control} />
      </CardContent>
    </Card>
  )
}
