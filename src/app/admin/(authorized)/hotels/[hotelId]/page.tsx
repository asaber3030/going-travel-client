import { notFound } from "next/navigation"
import { PageTitle } from "@/components/common/page-title"
import { getHotel } from "../_helpers/actions"
import { UpdateHotelDetailsForm } from "../_components/update/update-details"

type Props = {
  params: Promise<{
    hotelId: string
  }>
}

export default async function UpdateTourPage({ params }: Props) {
  const { hotelId } = await params
  const hotel = await getHotel(+hotelId)

  console.log(hotel)

  if (!hotel) return notFound()

  return (
    <div>
      <PageTitle label={`Update Hotel - ${hotel.name}`} />
      <UpdateHotelDetailsForm hotel={hotel} />
    </div>
  )
}
