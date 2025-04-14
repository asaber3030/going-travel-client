import { getLimousine, getLimousineSpecifications } from "../../../_helpers/actions"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineSpecificationForm } from "../../../_components/update/nested-forms/specifications/create-form"
import { UpdateLimousineSpecificationForm } from "../../../_components/update/nested-forms/specifications/update-form"
import { UpdateTabs } from "../../../_components/update/tabs"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function LimousinespecificationsPage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)
  const specifications = await getLimousineSpecifications(+limousineId)

  console.log({ specifications })

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label='Tour specifications' />
      <UpdateTabs limousineId={limousine.id} />
      <CreateLimousineSpecificationForm limousine={limousine} />

      <h2 className='text-2xl font-semibold my-4'>Limousine specifications</h2>

      {specifications.length === 0 && <div className='text-center text-gray-500'>No data found please add to show here.</div>}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {specifications.map((specification) => (
          <UpdateLimousineSpecificationForm key={specification.id} specification={specification} />
        ))}
      </div>
    </div>
  )
}
