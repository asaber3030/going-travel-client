import { GoBack } from "@/components/common/go-back"
import { CreateHajForm } from "../_components/create-form"
import { PageTitle } from "@/components/common/page-title"

export const metadata = {
  title: "Create Haj"
}

export default function CreateCategoryPage() {
  return (
    <div>
      <PageTitle label='Create Haj'>
        <GoBack />
      </PageTitle>
      <CreateHajForm />
    </div>
  )
}
