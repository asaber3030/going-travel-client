import { getTour, getTourHighlights } from "../../../_helpers/actions";
import { notFound } from "next/navigation";

import { UpdateTourItinerariesForm } from "../../../_components/update/nested-forms/itineraries/update-form";
import { PageTitle } from "@/components/common/page-title";
import { CreateTourHighlightForm } from "../../../_components/update/nested-forms/highlights/create-form";
import { UpdateTourHighlightForm } from "../../../_components/update/nested-forms/highlights/update-form";
import { UpdateTabs } from "../../../_components/update/tabs";

type Props = {
  params: Promise<{
    tourId: string;
  }>;
};

export default async function TourHighlightsPage({ params }: Props) {
  const { tourId } = await params;

  const tour = await getTour(+tourId);
  const highlights = await getTourHighlights(+tourId);

  if (!tour) return notFound();

  return (
    <div>
      <PageTitle label='Tour Highlights' />
      <UpdateTabs tourId={tour.id} />

      <CreateTourHighlightForm tour={tour} />

      <h2 className='text-2xl font-semibold my-4'>
        Tour Itineraries - <b>{tour.title || "N/A"}</b>
      </h2>
      {highlights.length === 0 && (
        <div className='text-center text-gray-500'>No data found please add to show here.</div>
      )}
      <div className='grid xl:grid-cols-2 gap-4 items-center mt-4'>
        {highlights.map((highlight) => (
          <UpdateTourHighlightForm
            tourId={tour.id}
            key={`update-form-${highlight.id}`}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
}
