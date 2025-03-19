import React from "react";

import { SubHeader } from "../categories/_components/sub-header";
import { LocationsTable } from "./_components/table";
import { getAllLocations } from "./_components/actions";
import { PaginationLinks } from "@/components/common/pagination";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const LocationsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const locations = await getAllLocations(
    params.page ? parseInt(params.page) : 1
  );
  return (
    <main className="space-y-6 ">
      <SubHeader
        headerTitle={"Locations"}
        trashedLink={"/admin/locations/trashed"}
        trashedTitle={"Trashed Locations"}
        createTitle={"Create Locations"}
        createLink={"/admin/locations/create"}
      />
      <LocationsTable data={locations} />
      <PaginationLinks pagination={locations} />
    </main>
  );
};

export default LocationsPage;
