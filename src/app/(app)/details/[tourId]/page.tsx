import React from "react";
import TourDetails from "./_components/tour-details";

async function page({ params }: { params: Promise<{ tourId: string }> }) {
  const { tourId } = await params;
  return (
    <main>
      <TourDetails />
    </main>
  );
}

export default page;
