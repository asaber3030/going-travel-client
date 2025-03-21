import { getTour, getTourReviews } from "../../../_helpers/actions";
import { notFound } from "next/navigation";

import { PageTitle } from "@/components/common/page-title";
import { CreateTourReviewForm } from "../../../_components/update/nested-forms/reviews/create-form";
import { UpdateTourReviewForm } from "../../../_components/update/nested-forms/reviews/update-form";
import { UpdateTabs } from "../../../_components/update/tabs";

type Props = {
  params: Promise<{
    tourId: string;
  }>;
};

export default async function TourReviewsPage({ params }: Props) {
  const { tourId } = await params;

  const tour = await getTour(+tourId);
  const reviews = await getTourReviews(+tourId);

  if (!tour) return notFound();

  return (
    <div>
      <PageTitle label='Tour Reviews' />
      <UpdateTabs tourId={tour.id} />
      <CreateTourReviewForm tour={tour} />

      <h2 className='text-2xl font-semibold my-4'>
        Tour Reviews - <b>{tour.title || "N/A"}</b>
      </h2>

      {reviews.length === 0 && (
        <div className='text-center text-gray-500'>No data found please add to show here.</div>
      )}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {reviews.map((review) => (
          <UpdateTourReviewForm tourId={tour.id} key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
