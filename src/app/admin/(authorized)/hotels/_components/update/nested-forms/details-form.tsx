"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SelectField } from "@/components/common/select-field"
import { InputField } from "@/components/common/input-field"
import { SelectItem } from "@/components/ui/select"

type Props = {
  form: any
}

export const UpdateDetailsForm = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>

      <CardContent className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
        <InputField label='Stars' placeholder='5' name='stars' type='number' control={form.control} valueAsNumber />
        <InputField label='Price Per Night' placeholder='500' name='price' type='number' control={form.control} valueAsNumber />
      </CardContent>
    </Card>
  )
}
