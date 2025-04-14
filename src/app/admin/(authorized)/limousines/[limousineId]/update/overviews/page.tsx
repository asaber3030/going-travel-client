import { getLimousine, getLimousineOverviews } from "../../../_helpers/actions"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineOverviewForm } from "../../../_components/update/nested-forms/overviews/create-form"
import { UpdateLimousineOverviewForm } from "../../../_components/update/nested-forms/overviews/update-form"
import { UpdateTabs } from "../../../_components/update/tabs"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function LimousineOverviewsPage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)
  const overviews = await getLimousineOverviews(+limousineId)

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label='Tour overviews' />
      <UpdateTabs limousineId={limousine.id} />
      <CreateLimousineOverviewForm limousine={limousine} />

      <h2 className='text-2xl font-semibold my-4'>Limousine overviews</h2>

      {overviews.length === 0 && <div className='text-center text-gray-500'>No data found please add to show here.</div>}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {overviews.map((overview) => (
          <UpdateLimousineOverviewForm key={overview.id} overview={overview} />
        ))}
      </div>
    </div>
  )
}
