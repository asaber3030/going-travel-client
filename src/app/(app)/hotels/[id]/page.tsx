import { getUIHotelById } from "../_actions/data"
import { notFound } from "next/navigation"
import { HotelDetailsHeader } from "../_components/hotel_details_header"
import { HotelDetailsMainContent } from "../_components/hotel_details_main_content"

type Props = {
  params: Promise<{ id: string }>
}

export default async function HotelDetailsPage({ params }: Props) {
  const id = (await params).id
  const hotel = await getUIHotelById(+id)
  if (!hotel) return notFound()

  return (
    <div className='bg-gray-50'>
      <HotelDetailsHeader hotel={hotel} />
      <HotelDetailsMainContent hotel={hotel} />
    </div>
  )
}
