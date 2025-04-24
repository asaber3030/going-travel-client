"use client";

import { useState } from "react";
import { useCategories } from "../../../categories/_helpers/hooks";
import { FilterBySearch } from "@/components/common/searchable-field";

export function CategoriesSelect({
  name,
  form,
  selectedVal = ""
}: {
  name: string;
  form: any;
  selectedVal?: string;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(selectedVal);

  const { categories: data, isCategoriesLoading: isLoading } = useCategories(search);

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
      formLabel='Categories'
      value={selected}
      setValue={setSearch}
      isLoading={isLoading}
      onCommandSelect={onCommandSelect}
      error={form.formState.errors?.[name]?.message}
      data={values}
    />
  );
}
