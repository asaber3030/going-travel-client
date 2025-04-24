import { PageTitle } from "@/components/common/page-title"
import { getServiceCards } from "../_helpers/actions"

import { Separator } from "@/components/ui/separator"
import { LinkBtn } from "@/components/common/button-link"
import { Badge } from "@/components/ui/badge"

import Image from "next/image"

export default async function SettingsPage() {
  const serviceCards = await getServiceCards()

  return (
    <div>
      <PageTitle label='Service Cards' />
      <div className='grid xl:grid-cols-4 gap-4 items-center'>
        {serviceCards.map((card) => (
          <div key={card.id} className='bg-white shadow border rounded-md overflow-hidden'>
            <Image src={card.image} alt={card.title} width={1000} height={1000} className='w-full h-44 object-cover' />
            <div className='mt-4 mb-4 p-4'>
              {!card.enabled && <Badge variant='destructive'>DISABLED</Badge>}
              <h1 className='text-2xl font-bold'>{card.title}</h1>
              <p className='text-sm text-gray-500'>{card.description}</p>
            </div>
            <Separator />
            <div className=' p-4'>
              <LinkBtn href={`/admin/settings/service-cards/${card.id}`}>Update</LinkBtn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
