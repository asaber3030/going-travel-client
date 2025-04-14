import { getLimousine, getLimousineFeatures } from "../../../_helpers/actions"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineFeatureForm } from "../../../_components/update/nested-forms/features/create-form"
import { UpdateLimousineFeatureForm } from "../../../_components/update/nested-forms/features/update-form"
import { UpdateTabs } from "../../../_components/update/tabs"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function LimousineFeaturesPage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)
  const features = await getLimousineFeatures(+limousineId)

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label='Tour features' />
      <UpdateTabs limousineId={limousine.id} />
      <CreateLimousineFeatureForm limousine={limousine} />

      <h2 className='text-2xl font-semibold my-4'>Limousine Features</h2>

      {features.length === 0 && <div className='text-center text-gray-500'>No data found please add to show here.</div>}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {features.map((feature) => (
          <UpdateLimousineFeatureForm key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  )
}
