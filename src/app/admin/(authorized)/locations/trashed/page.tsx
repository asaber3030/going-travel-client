import { PaginationLinks } from "@/components/common/pagination";
import { Metadata } from "next";
import { LinkBtn } from "@/components/common/button-link";
import { LocationsTable } from "../_components/table";
import { PageTitle } from "@/components/common/page-title";

import { getTrashedLocations } from "../_helpers/actions";
import { routes } from "@/lib/route";

export const metadata: Metadata = {
  title: "Trashed Locations"
};

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const TrashedLocationsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const locations = await getTrashedLocations(params.page ? parseInt(params.page) : 1);

  return (
    <main className='space-y-6 '>
      <PageTitle label='Locations'>
        <LinkBtn href={routes.locations.create}>Create New</LinkBtn>
        <LinkBtn href={routes.locations.trash}>Trash</LinkBtn>
      </PageTitle>
      <LocationsTable data={locations} />
      <PaginationLinks pagination={locations} />
    </main>
  );
};

export default TrashedLocationsPage;
