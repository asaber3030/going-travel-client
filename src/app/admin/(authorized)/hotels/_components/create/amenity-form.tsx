"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputField } from "@/components/common/input-field"
import { SelectItem } from "@/components/ui/select"
import { SelectField } from "@/components/common/select-field"

type Props = {
  form: any
}

export const CreateAmenityForm = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Amenity</CardTitle>
      </CardHeader>

      <CardContent className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
        <SelectField label='free wifi' name='amenity.free_wifi' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='spa wellness center' name='amenity.spa_wellness_center' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='fitness center' name='amenity.fitness_center' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='gourmet restaurant' name='amenity.gourmet_restaurant' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='indoor outdoor pools' name='amenity.indoor_outdoor_pools' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='air conditioning' name='amenity.air_conditioning' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='flat screen tv' name='amenity.flat_screen_tv' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='free parking' name='amenity.free_parking' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
        <SelectField label='front desk 24h' name='amenity.front_desk_24h' control={form.control} defaultValue='yes'>
          <SelectItem value='yes'>Yes</SelectItem>
          <SelectItem value='no'>No</SelectItem>
        </SelectField>
      </CardContent>
    </Card>
  )
}
