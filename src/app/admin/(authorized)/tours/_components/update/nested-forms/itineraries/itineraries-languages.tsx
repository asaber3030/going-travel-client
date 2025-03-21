"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Languages } from "@/lib/constants";
import { InputField } from "@/components/common/input-field";
import { randomNumber } from "@/lib/utils";

type Props = {
  form: any;
};

export const ItinerariesLanguagesForm = ({ form }: Props) => {
  return (
    <Tabs defaultValue={Languages[0].code}>
      <TabsList className='mb-2'>
        {Languages.map((lang) => (
          <TabsTrigger key={`tab-list-${lang.code}-${randomNumber()}`} value={lang.code}>
            {lang.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {Languages.map((lang, index) => (
        <TabsContent
          key={`tab-content-${lang.code}-${randomNumber()}`}
          value={lang.code}
          className='space-y-4'
        >
          <InputField
            disabled
            formFieldDefaultValue={lang.code}
            control={form.control}
            name={`translations.${index}.locale`}
            label='Locale'
          />

          <InputField control={form.control} name={`translations.${index}.title`} label='Title' />

          <InputField
            control={form.control}
            name={`translations.${index}.description`}
            label='Description'
            isTextarea
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};
