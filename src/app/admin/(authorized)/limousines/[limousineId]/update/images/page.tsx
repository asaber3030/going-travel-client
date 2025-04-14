import { getLimousine, getLimousineImages } from "../../../_helpers/actions"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineImageForm } from "../../../_components/update/nested-forms/images/create-form"
import { UpdateLimousineImageForm } from "../../../_components/update/nested-forms/images/update-form"
import { UpdateTabs } from "../../../_components/update/tabs"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function TourImagesPage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)
  const images = await getLimousineImages(+limousineId)

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label='Limousines Images' />
      <UpdateTabs limousineId={limousine.id} />

      <CreateLimousineImageForm limousine={limousine} />

      <h2 className='text-2xl font-semibold my-4'>
        Limousine Images - <b>#{limousine.id}</b>
      </h2>
      {images.length === 0 && <div className='text-center text-gray-500'>No data found please add to show here.</div>}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {images.map((image) => (
          <UpdateLimousineImageForm limousineId={limousine.id} key={image.id} limousineImage={image} />
        ))}
      </div>
    </div>
  )
}
