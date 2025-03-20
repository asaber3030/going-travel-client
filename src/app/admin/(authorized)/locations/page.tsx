import React from "react";

import { LocationsTable } from "./_components/table";
import { getLocations } from "./_helpers/actions";
import { PaginationLinks } from "@/components/common/pagination";
import { Metadata } from "next";
import { LinkBtn } from "@/components/common/button-link";
import { PageTitle } from "@/components/common/page-title";
import { routes } from "@/lib/route";

export const metadata: Metadata = {
  title: "Locations"
};

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const LocationsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const locations = await getLocations(params.page ? parseInt(params.page) : 1);

  return (
    <main className='space-y-6 '>
      <PageTitle label='Locations'>
        <LinkBtn href={routes.locations.create}>Create New</LinkBtn>
        <LinkBtn variant='destructive' href={routes.locations.trash}>
          Trash
        </LinkBtn>
      </PageTitle>
      <LocationsTable data={locations} />
      <PaginationLinks pagination={locations} />
    </main>
  );
};

export default LocationsPage;
