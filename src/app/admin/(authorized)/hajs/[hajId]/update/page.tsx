import { getHaj } from "../../_helpers/actions"
import { notFound } from "next/navigation"
import { routes } from "@/lib/route"

import { UpdateCategoryForm } from "../../_components/update-form"
import { Metadata } from "next"
import { PageTitle } from "@/components/common/page-title"
import { LinkBtn } from "@/components/common/button-link"
import { GoBack } from "@/components/common/go-back"
import { Eye } from "lucide-react"

type Props = {
  params: Promise<{ hajId: string }>
}

export const metadata: Metadata = {
  title: "Update haj"
}

export default async function UpdateCategoryPage({ params }: Props) {
  const { hajId } = await params
  const haj = await getHaj(Number(hajId))
  if (!haj) return notFound()

  return (
    <div>
      <PageTitle label={`Update Haj - "${haj.title}"`}>
        <GoBack />
      </PageTitle>

      <UpdateCategoryForm id={haj.id} haj={haj} />
    </div>
  )
}
