import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineForm } from "../_components/create/create-form"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Limousine"
}

export default function CreateTourPage() {
  return (
    <div>
      <PageTitle label='Create Limousine' />
      <CreateLimousineForm />
    </div>
  )
}
