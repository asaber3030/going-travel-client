import { PageTitle } from "@/components/common/page-title"
import { CreateHotelForm } from "../_components/create/create-form"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Hotel"
}

export default function CreateHotelPage() {
  return (
    <div>
      <PageTitle label='Create Hotel' />
      <CreateHotelForm />
    </div>
  )
}
