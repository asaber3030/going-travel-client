import { notFound } from "next/navigation"
import { getUILocationTours, getUILocation } from "../_actions/data"
import { PaginationLinks } from "@/components/common/pagination"
import { getTranslations } from "next-intl/server"

import TourCard from "../../_components/tour-card"
import LocationIDHeader from "../_components/location-id-header"
import { NoDataLabel } from "@/components/common/no-data-label"

type Props = {
  params: Promise<{
    locationId: string
  }>
}

export default async function LocationIdTours({ params }: Props) {
  const { locationId } = await params

  const tours = await getUILocationTours(+locationId)
  const location = await getUILocation(+locationId)
  const t = await getTranslations()

  if (!location) return notFound()

  return (
    <div className='mb-10'>
      <LocationIDHeader location={location} />

      <div className='container mx-auto px-4 py-10'>
        <h2 className='my-4 text-2xl font-semibold'>{t("tours")}</h2>
        {tours?.data?.length === 0 ? (
          <NoDataLabel />
        ) : (
          <section className='grid gap-4 grid-cols-1 xl:grid-cols-4 md:grid-cols-3'>
            {tours?.data?.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </section>
        )}
      </div>

      <PaginationLinks pagination={tours} />
    </div>
  )
}
