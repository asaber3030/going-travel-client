import { PageTitle } from "@/components/common/page-title"
import { getServiceCards } from "./_helpers/actions"

import { UpdateSingleSettings } from "./_components/update-single-settings"
import { Separator } from "@/components/ui/separator"
import { LinkBtn } from "@/components/common/button-link"

export default async function SettingsPage() {
  const serviceCards = await getServiceCards()

  return (
    <div>
      <PageTitle label='Service Cards' />
      {serviceCards.map((card) => (
        <div key={card.id} className='bg-white shadow border rounded-md'>
          <img src={card.image} alt={card.title} className='w-full h-32' />
          <div className='mt-4 mb-4 p-4'>
            <h1>{card.title}</h1>
            <p>{card.description}</p>
          </div>
          <Separator />
          <div className=' p-4'>
            <LinkBtn href={`/admin/settings/service-cards/${card.id}`}>Update</LinkBtn>
          </div>
        </div>
      ))}
    </div>
  )
}
