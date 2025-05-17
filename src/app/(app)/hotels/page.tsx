import { TSearchParams } from "@/types"
import { getUILocations } from "../destinations/_actions/data"
import { getUIHotels } from "./_actions/data"
import { HotelHeroSlides } from "./_components/hotel_hero_slides"
import { SortAndHotelsSection } from "./_components/sort_and_hotels_section"
import { PaginationLinks } from "@/components/common/pagination"

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function HotelsPage({ searchParams }: Props) {
  const sp = await searchParams
  const locations = await getUILocations()
  const hotels = await getUIHotels(sp)

  console.log("HotelsPage", hotels)

  return (
    <div>
      <HotelHeroSlides />
      <SortAndHotelsSection locations={locations} hotels={hotels.data} />
      <PaginationLinks pagination={hotels} />
      <div className='py-10' />
    </div>
  )
}
