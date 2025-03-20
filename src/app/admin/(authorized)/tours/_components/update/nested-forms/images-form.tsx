"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileField } from "@/components/common/file-field";
import { SetStateAction } from "react";

type Props = {
  setBanner: React.Dispatch<SetStateAction<File | null>>;
  setThumbnail: React.Dispatch<SetStateAction<File | null>>;
};

export const CreateImagesForm = ({ setBanner, setThumbnail }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <FileField label='Banner' onChange={setBanner} />
        <FileField label='Thumbnail' onChange={setThumbnail} />
      </CardContent>
    </Card>
  );
};
