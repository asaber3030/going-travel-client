import { notFound } from "next/navigation"
import { getUITourDetails, getRelatedTours } from "./_actions/data"
import TourDetails from "./_components/tour-details"

async function TourIdDetails({ params }: { params: Promise<{ tourId: string }> }) {
  const { tourId } = await params

  const tour = await getUITourDetails(+tourId)
  const relatedTours = await getRelatedTours(+tourId)

  console.log(relatedTours)

  if (!tour) return notFound()

  return <TourDetails relatedTours={relatedTours} tour={tour} />
}

export default TourIdDetails
