import { getUICategoryTours, getUICategory } from "../_actions/data"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { PaginationLinks } from "@/components/common/pagination"
import { NoDataLabel } from "@/components/common/no-data-label"

import TourCard from "../../_components/tour-card"
import CategoryIdHeader from "../_components/category-id-header"

type Props = {
  params: Promise<{
    categoryId: string
  }>
}

export default async function categoryIdTours({ params }: Props) {
  const { categoryId } = await params

  const tours = await getUICategoryTours(+categoryId)
  const category = await getUICategory(+categoryId)
  const t = await getTranslations()

  if (!category) return notFound()

  return (
    <div className='mb-10'>
      <CategoryIdHeader category={category} />

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
