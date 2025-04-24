"use client"

import { LoadingButton } from "@/components/common/loading-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TSettings } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { updateSettingsById } from "../_helpers/actions"
import { toast } from "react-toastify"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages } from "@/lib/constants"

type Props = {
  setting: TSettings
}

export const UpdateSingleSettings = ({ setting }: Props) => {
  const [value, setValue] = useState<string>(setting.value)
  const [locale, setLocale] = useState<string>(setting.locale)

  const mutation = useMutation({
    mutationFn: (value: string) => updateSettingsById(setting.key, setting.locale, value),
    onSuccess: (data) => {
      toast.success("Setting updated successfully")
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong")
    }
  })

  const handleSubmit = () => {
    mutation.mutate(value)
  }

  return (
    <div className='bg-white p-4 rounded-md border flex items-center justify-between'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label className='capitalize'>{setting.key}</Label>
          <Input required value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='capitalize'>Locale</Label>
          <Select onValueChange={(e) => setLocale(e)} defaultValue={locale}>
            <SelectTrigger defaultValue={locale}>
              <SelectValue placeholder='Locale' />
            </SelectTrigger>
            <SelectContent>
              {Languages.map((l) => (
                <SelectItem key={`key-${l.code}`} value={l.code}>
                  {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <LoadingButton loading={mutation.isPending} onClick={handleSubmit}>
        Save
      </LoadingButton>
    </div>
  )
}
