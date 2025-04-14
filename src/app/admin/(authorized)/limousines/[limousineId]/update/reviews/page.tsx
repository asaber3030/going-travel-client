import { getLimousine, getLimousineReviews } from "../../../_helpers/actions"
import { notFound } from "next/navigation"

import { PageTitle } from "@/components/common/page-title"
import { CreateLimousineReviewForm } from "../../../_components/update/nested-forms/reviews/create-form"
import { UpdateLimousineReviewForm } from "../../../_components/update/nested-forms/reviews/update-form"
import { UpdateTabs } from "../../../_components/update/tabs"

type Props = {
  params: Promise<{
    limousineId: string
  }>
}

export default async function TourReviewsPage({ params }: Props) {
  const { limousineId } = await params

  const limousine = await getLimousine(+limousineId)
  const reviews = await getLimousineReviews(+limousineId)

  if (!limousine) return notFound()

  return (
    <div>
      <PageTitle label='Tour Reviews' />
      <UpdateTabs limousineId={limousine.id} />
      <CreateLimousineReviewForm limousine={limousine} />

      <h2 className='text-2xl font-semibold my-4'>Limousine Reviews</h2>

      {reviews.length === 0 && <div className='text-center text-gray-500'>No data found please add to show here.</div>}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {reviews.map((review) => (
          <UpdateLimousineReviewForm limousineId={limousine.id} key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
