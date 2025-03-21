import { getTour, getTourExclusions } from "../../../_helpers/actions";
import { notFound } from "next/navigation";

import { PageTitle } from "@/components/common/page-title";
import { CreateTourExclusionForm } from "../../../_components/update/nested-forms/exclusions/create-form";
import { UpdateTourExclusionForm } from "../../../_components/update/nested-forms/exclusions/update-form";
import { UpdateTabs } from "../../../_components/update/tabs";

type Props = {
  params: Promise<{
    tourId: string;
  }>;
};

export default async function TourExclusionsPage({ params }: Props) {
  const { tourId } = await params;

  const tour = await getTour(+tourId);
  const exclusions = await getTourExclusions(+tourId);

  if (!tour) return notFound();

  return (
    <div>
      <PageTitle label='Tour Exclusions & Inclusions' />
      <UpdateTabs tourId={tour.id} />

      <CreateTourExclusionForm tour={tour} />

      <h2 className='text-2xl font-semibold my-4'>
        Tour Exclusions & Inclusions - <b>{tour.title || "N/A"}</b>
      </h2>
      {exclusions.length === 0 && (
        <div className='text-center text-gray-500'>No data found please add to show here.</div>
      )}
      <div className='grid xl:grid-cols-2 gap-4 items-center mt-4'>
        {exclusions.map((exclusion) => (
          <UpdateTourExclusionForm
            tourId={tour.id}
            key={`update-form-${exclusion.id}`}
            exclusion={exclusion}
          />
        ))}
      </div>
    </div>
  );
}
