"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updateCategory } from "./actions";
import { showResponse } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategorySchema } from "@/schema";
import { Form } from "@/components/ui/form";
import { Languages } from "@/lib/constants";
import { InputField } from "@/components/common/input-field";
import { FileField } from "@/components/common/file-field";
import { LoadingButton } from "@/components/common/loading-button";
import { Category, CategoryTranslation } from "@/types";

type Mutation = {
  file: File | null;
  data: Data;
};

type Data = z.infer<typeof CategorySchema.Create>;

type Props = {
  category: Category;
  translations?: CategoryTranslation[];
  id: number;
};

export const UpdateCategoryForm = ({ category, translations, id }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<Data>({
    resolver: zodResolver(CategorySchema.Create),
    defaultValues: {
      translations: translations,
    },
  });

  const mutation = useMutation({
    mutationFn: ({ file, data }: Mutation) => updateCategory(id, file, data),
    onSuccess: (data) => showResponse(data),
  });

  const onSubmit = () => {
    mutation.mutate({
      file,
      data: form.getValues(),
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FileField label="Image" onChange={setFile} />

          <Tabs defaultValue={Languages[0].code}>
            <TabsList className="mb-4">
              {Languages.map((lang) => (
                <TabsTrigger key={`tab-list-${lang.code}`} value={lang.code}>
                  {lang.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Languages.map((lang, index) => (
              <TabsContent
                key={`tab-content-${lang.code}`}
                value={lang.code}
                className="space-y-4"
              >
                <InputField
                  disabled
                  formFieldDefaultValue={lang.code}
                  control={form.control}
                  name={`translations.${index}.locale`}
                  defaultValue={lang.name}
                  label="Locale"
                />

                <InputField
                  control={form.control}
                  name={`translations.${index}.name`}
                  value={
                    translations?.find((t) => t.locale === lang.code)?.name
                  }
                  label="Name"
                />

                <InputField
                  control={form.control}
                  name={`translations.${index}.description`}
                  value={
                    translations?.find((t) => t.locale === lang.code)
                      ?.description
                  }
                  label="Description"
                />
              </TabsContent>
            ))}
          </Tabs>

          <LoadingButton
            loading={mutation.isPending}
            type="submit"
            className="mt-4"
          >
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};
