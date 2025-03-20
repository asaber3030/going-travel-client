import { getCategories } from "./_helpers/actions";
import { CategoriesTable } from "./_components/table";
import { PaginationLinks } from "@/components/common/pagination";
import { LinkBtn } from "@/components/common/button-link";
import { routes } from "@/lib/route";
import { PageTitle } from "@/components/common/page-title";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function CategoriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const categories = await getCategories(params.page ? parseInt(params.page) : 1);

  return (
    <main className='space-y-6 '>
      <PageTitle label='Categories'>
        <LinkBtn href={routes.categories.create}>Create</LinkBtn>
        <LinkBtn variant='destructive' href={routes.categories.trash}>
          Trashed
        </LinkBtn>
      </PageTitle>
      <CategoriesTable data={categories} />
      <PaginationLinks pagination={categories} />
    </main>
  );
}
