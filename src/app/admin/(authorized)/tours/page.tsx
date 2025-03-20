import { PaginationLinks } from "@/components/common/pagination";
import { ToursTable } from "./_components/table";
import { PageTitle } from "@/components/common/page-title";
import { LinkBtn } from "@/components/common/button-link";
import { Plus } from "lucide-react";

import { getTours } from "./_helpers/actions";
import { routes } from "@/lib/route";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ToursPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const tours = await getTours(Number(page));

  return (
    <div>
      <PageTitle label='Tours'>
        <LinkBtn href={routes.tours.create} variant='outline' icon={Plus}>
          Create
        </LinkBtn>
      </PageTitle>

      <ToursTable tours={tours.data.data} />
      <PaginationLinks pagination={tours.data} />
    </div>
  );
}
