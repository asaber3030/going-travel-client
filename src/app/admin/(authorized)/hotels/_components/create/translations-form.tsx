"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Languages } from "@/lib/constants"
import { InputField } from "@/components/common/input-field"

type Props = {
  form: any
}

export const CreateTranslationsForm = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Translations</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={Languages[0].code}>
          <TabsList className='mb-4'>
            {Languages.map((lang) => (
              <TabsTrigger key={`tab-list-${lang.code}`} value={lang.code}>
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Languages.map((lang, index) => (
            <TabsContent key={`tab-content-${lang.code}`} value={lang.code} className='space-y-4'>
              <InputField disabled formFieldDefaultValue={lang.code} control={form.control} name={`translations.${index}.locale`} label='Locale' />

              <InputField control={form.control} name={`translations.${index}.name`} label='Name' />
              <InputField control={form.control} name={`translations.${index}.description`} label='Description' isTextarea />
              <InputField control={form.control} name={`translations.${index}.short_description`} label='Short description' isTextarea />
              <InputField control={form.control} name={`translations.${index}.address`} label='Address' />
              <InputField control={form.control} name={`translations.${index}.room_types`} label='Room types' />
              <InputField control={form.control} name={`translations.${index}.policy`} label='Policy' />
              <InputField control={form.control} name={`translations.${index}.slug`} label='Slug' />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
