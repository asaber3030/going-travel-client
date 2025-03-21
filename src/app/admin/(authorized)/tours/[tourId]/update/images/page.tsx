import { getTour, getTourImages } from "../../../_helpers/actions";
import { notFound } from "next/navigation";

import { PageTitle } from "@/components/common/page-title";
import { CreateTourImageForm } from "../../../_components/update/nested-forms/images/create-form";
import { UpdateTourImageForm } from "../../../_components/update/nested-forms/images/update-form";
import { UpdateTabs } from "../../../_components/update/tabs";

type Props = {
  params: Promise<{
    tourId: string;
  }>;
};

export default async function TourImagesPage({ params }: Props) {
  const { tourId } = await params;

  const tour = await getTour(+tourId);
  const images = await getTourImages(+tourId);

  if (!tour) return notFound();

  return (
    <div>
      <PageTitle label='Tour Images' />
      <UpdateTabs tourId={tour.id} />

      <CreateTourImageForm tour={tour} />

      <h2 className='text-2xl font-semibold my-4'>
        Tour Images - <b>{tour.title || "N/A"}</b>
      </h2>
      {images.length === 0 && (
        <div className='text-center text-gray-500'>No data found please add to show here.</div>
      )}
      <div className='grid xl:grid-cols-2 gap-4 mt-4'>
        {images.map((image) => (
          <UpdateTourImageForm tourId={tour.id} key={image.id} tourImage={image} />
        ))}
      </div>
    </div>
  );
}
