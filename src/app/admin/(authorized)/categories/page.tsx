import { getCategories } from "./_components/actions";
import { CategoryPagination } from "./_components/category-pagination";
import { CategoriesTable } from "./_components/table";
import { SubHeader } from "./_components/sub-header";
import { PaginationLinks } from "@/components/common/pagination";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function CategoriesPage({ searchParams }: Props) {
  const params = await searchParams;
  const categories = await getCategories(
    params.page ? parseInt(params.page) : 1
  );

  return (
    <main className="space-y-6 ">
      <SubHeader
        headerTitle={"Categories"}
        trashedLink={"/admin/categories/trashed"}
        trashedTitle={"Trashed Category"}
        createTitle={"Create Category"}
        createLink={"/admin/categories/create"}
      />
      <CategoriesTable data={categories} />
      <PaginationLinks pagination={categories} />
    </main>
  );
}
