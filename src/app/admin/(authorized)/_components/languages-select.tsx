"use client"

import { Languages } from "@/lib/constants"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import Image from "next/image"

type Props = {
  form: any
  defaultValue?: string
}

export const LanguagesSelect = ({ form, defaultValue }: Props) => {
  return (
    <SelectField defaultValue={defaultValue} name='locale' control={form.control} label='Locale'>
      {Languages.map((lang) => (
        <SelectItem key={`tab-list-${lang.code}`} value={lang.code} className='flex gap-2 items-center'>
          <Image src={lang.flag} alt={lang.name} width={20} height={20} className='rounded-full' />
          {lang.name}
        </SelectItem>
      ))}
    </SelectField>
  )
}
