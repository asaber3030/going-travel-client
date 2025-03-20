"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Languages } from "@/lib/constants";
import { InputField } from "@/components/common/input-field";

type Props = {
  form: any;
  hasDistanceDescription?: boolean;
  titleOrName?: "title" | "name";
};

export const LanguagesForm = ({
  form,
  titleOrName = "name",
  hasDistanceDescription = false
}: Props) => {
  return (
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
          <InputField
            disabled
            formFieldDefaultValue={lang.code}
            control={form.control}
            name={`translations.${index}.locale`}
            label='Locale'
          />

          <InputField
            control={form.control}
            name={`translations.${index}.${titleOrName}`}
            label='Name'
          />

          <InputField
            control={form.control}
            name={`translations.${index}.description`}
            label='Description'
            isTextarea
          />

          {hasDistanceDescription && (
            <InputField
              control={form.control}
              name={`translations.${index}.distance_description`}
              label='Distance Description'
              isTextarea
            />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
