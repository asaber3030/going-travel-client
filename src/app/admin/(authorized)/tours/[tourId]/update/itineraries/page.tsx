import { getTour, getTourItineraries } from "../../../_helpers/actions";
import { notFound } from "next/navigation";

import { UpdateTourItinerariesForm } from "../../../_components/update/nested-forms/itineraries/update-form";
import { CreateTourItineraryForm } from "../../../_components/update/nested-forms/itineraries/create-form";
import { PageTitle } from "@/components/common/page-title";
import { UpdateTabs } from "../../../_components/update/tabs";

type Props = {
  params: Promise<{
    tourId: string;
  }>;
};

export default async function TourItinerariesPage({ params }: Props) {
  const { tourId } = await params;

  const tour = await getTour(+tourId);
  const itineraries = await getTourItineraries(+tourId);

  if (!tour) return notFound();

  return (
    <div>
      <PageTitle label='Tour Itineraries' />
      <UpdateTabs tourId={tour.id} />
      <CreateTourItineraryForm tour={tour} />
      <h2 className='text-2xl font-semibold my-4'>
        Tour Itineraries - <b>{tour.title || "N/A"}</b>
      </h2>
      {itineraries.length === 0 && (
        <div className='text-center text-gray-500'>No data found please add to show here.</div>
      )}
      <div className='grid xl:grid-cols-2 gap-4 items-center mt-4'>
        {itineraries.map((itinerary) => (
          <UpdateTourItinerariesForm tourId={tour.id} key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
}
