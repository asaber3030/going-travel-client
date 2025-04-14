"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileField } from "@/components/common/file-field"
import { SetStateAction } from "react"

type Props = {
  setFile: React.Dispatch<SetStateAction<File | null>>
}

export const CreateImagesForm = ({ setFile }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>

      <CardContent className='space-y-2'>
        <FileField label='Image' onChange={setFile} />
      </CardContent>
    </Card>
  )
}
