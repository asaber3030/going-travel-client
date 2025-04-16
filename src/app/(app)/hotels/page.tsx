import { getUIHotels } from "./_actions/data";
import { HotelHeroSlides } from "./_components/hotel_hero_slides";
import { SortAndHotelsSection } from "./_components/sort_and_hotels_section";
import { PaginationLinks } from "@/components/common/pagination";

export default async function HotelsPage() {
  const hotels = await getUIHotels();
  return (
    <div>
      <HotelHeroSlides />
      <SortAndHotelsSection hotels={hotels.data} />
      <PaginationLinks pagination={hotels} />
      <div className="py-10" />
    </div>
  );
}
