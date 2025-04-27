import { UpdateServiceCard } from "../_components/update"
import { PageTitle } from "@/components/common/page-title"

import { getServiceCard } from "../../_helpers/actions"

type Props = {
  params: Promise<{
    id: number
  }>
}

export default async function SettingsPage({ params }: Props) {
  const { id } = await params
  const card = await getServiceCard(+id)

  return (
    <div>
      <PageTitle label='Service Card' />
      <UpdateServiceCard card={card} />
    </div>
  )
}
