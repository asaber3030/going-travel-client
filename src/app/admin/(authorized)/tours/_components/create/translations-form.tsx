"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguagesForm } from "../../../_components/languages-form";

type Props = {
  form: any;
};

export const CreateTranslationsForm = ({ form }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Translations</CardTitle>
      </CardHeader>
      <CardContent>
        <LanguagesForm form={form} hasDistanceDescription titleOrName='title' />
      </CardContent>
    </Card>
  );
};
