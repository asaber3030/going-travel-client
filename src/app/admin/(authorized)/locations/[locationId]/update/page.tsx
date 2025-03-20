import { getLocation } from "../../_helpers/actions";
import { notFound } from "next/navigation";

import { UpdateLocationForm } from "../../_components/update-form";
import { PageTitle } from "@/components/common/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Location Page"
};

type Props = {
  params: Promise<{
    locationId: string;
  }>;
};

export default async function UpdateLocationPage({ params }: Props) {
  const { locationId } = await params;
  const location = await getLocation(+locationId);

  if (!location) return notFound();

  return (
    <div>
      <PageTitle label={`Update Location - ${location.name}`} />
      <UpdateLocationForm location={location} />
    </div>
  );
}
