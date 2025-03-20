"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriesSelect } from "../../select/categories";
import { LocationsSelect } from "../../select/locations";

type Props = {
  form: any;
  categoryName: string;
  pickupLocationName: string;
  locationName: string;
};

export const CreateRelationsForm = ({
  form,
  categoryName,
  pickupLocationName,
  locationName
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relations</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 xl:grid-cols-2 grid-cols-1'>
        <LocationsSelect selectedVal={pickupLocationName} name='location_id' form={form} />
        <LocationsSelect
          selectedVal={locationName}
          name='pickup_location_id'
          label='Pickup Location'
          form={form}
        />
        <CategoriesSelect selectedVal={categoryName} name='category_id' form={form} />
      </CardContent>
    </Card>
  );
};
