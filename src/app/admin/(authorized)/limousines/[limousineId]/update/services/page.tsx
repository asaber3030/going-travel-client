import { getLimousine, getLimousineServices } from "../../../_helpers/actions"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineServiceForm } from "../../../_components/update/nested-forms/services/create-form"
import { UpdateLimousineServiceForm } from "../../../_components/update/nested-forms/services/update-form"
import { UpdateTabs } from "../../../_components/update/tabs"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function LimousineservicesPage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)
  const services = await getLimousineServices(+limousineId)

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label='Tour services' />
      <UpdateTabs limousineId={limousine.id} />
      <CreateLimousineServiceForm limousine={limousine} />

      <h2 className='text-2xl font-semibold my-4'>Limousine services</h2>

      {services.length === 0 && <div className='text-center text-gray-500'>No data found please add to show here.</div>}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {services.map((Service) => (
          <UpdateLimousineServiceForm key={Service.id} service={Service} />
        ))}
      </div>
    </div>
  )
}
