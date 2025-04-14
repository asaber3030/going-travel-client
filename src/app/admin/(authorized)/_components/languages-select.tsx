"use client"

import { Languages } from "@/lib/constants"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"

type Props = {
  form: any
  defaultValue?: string
}

export const LanguagesSelect = ({ form, defaultValue }: Props) => {
  return (
    <SelectField defaultValue={defaultValue} name='locale' control={form.control} label='Locale'>
      {Languages.map((lang) => (
        <SelectItem key={`tab-list-${lang.code}`} value={lang.code}>
          {lang.name}
        </SelectItem>
      ))}
    </SelectField>
  )
}
