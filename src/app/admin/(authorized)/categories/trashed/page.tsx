import { PaginationLinks } from "@/components/common/pagination";
import { getTrashedCategories } from "../_helpers/actions";
import { CategoriesTable } from "../_components/table";
import { PageTitle } from "@/components/common/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trashed Categories"
};

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function DestinationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categories = await getTrashedCategories(params.page ? parseInt(params.page) : 1);

  return (
    <main className='space-y-6 '>
      <PageTitle label='Trashed Categories' />
      <CategoriesTable data={categories} />
      <PaginationLinks pagination={categories} />
    </main>
  );
}
