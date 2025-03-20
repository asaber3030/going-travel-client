import { notFound } from "next/navigation";
import { getTour } from "../../_helpers/actions";
import { PageTitle } from "@/components/common/page-title";
import { UpdateTabs } from "../../_components/update/tabs";
import { UpdateTourDetailsForm } from "../../_components/update/update-details";

type Props = {
  params: Promise<{
    tourId: string;
  }>;
};

export default async function UpdateTourPage({ params }: Props) {
  const { tourId } = await params;
  const tour = await getTour(+tourId);

  console.log({ tour });

  if (!tour) return notFound();

  return (
    <div>
      <PageTitle label={`Update Tour - ${tour.title}`} />
      <UpdateTabs tourId={tour.id} />
      <UpdateTourDetailsForm tour={tour} />
    </div>
  );
}
