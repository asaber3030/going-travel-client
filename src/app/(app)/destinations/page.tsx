import ToursFeaturedDestinations from "./_components/featured-destinations"

import { getUILocations } from "./_actions/data"

export default async function ToursPage() {
  const locations = await getUILocations()

  return <ToursFeaturedDestinations locations={locations} />
}
