"use client";

import { useState } from "react";
import { useLocations } from "../../../locations/_helpers/hooks";
import { FilterBySearch } from "@/components/common/searchable-field";

export function LocationsSelect({
  name,
  form,
  selectedVal = "",
  label = "Locations"
}: {
  label?: string;
  selectedVal?: string;
  name: string;
  form: any;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(selectedVal);

  const { locations: data, isLocationsLoading: isLoading } = useLocations(search);

  const values = data?.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.name
  }));

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelected(currentValue);
    form.setValue(name, id);
  };

  return (
    <FilterBySearch
      formLabel={label}
      value={selected}
      setValue={setSearch}
      isLoading={isLoading}
      onCommandSelect={onCommandSelect}
      error={form.formState.errors?.[name]?.message}
      data={values}
    />
  );
}
