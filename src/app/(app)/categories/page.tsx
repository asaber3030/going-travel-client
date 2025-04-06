import ToursFeaturedCategories from "./_components/featured-categories"

import { getUICategories } from "./_actions/data"

export default async function ToursPage() {
  const categories = await getUICategories()
  return <ToursFeaturedCategories categories={categories} />
}
