import { notFound } from "next/navigation"
import { getLimousine } from "../../_helpers/actions"
import { PageTitle } from "@/components/common/page-title"
import { UpdateTabs } from "../../_components/update/tabs"
import { UpdateLimousineDetailsForm } from "../../_components/update/update-details"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function UpdateLimousinePage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label={`Update Limousine`} />
      <UpdateTabs limousineId={limousine.id} />
      <UpdateLimousineDetailsForm limousine={limousine} />
    </div>
  )
}
