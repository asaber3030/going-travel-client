import Link from "next/link";
import { getTrashedCategories } from "../_components/actions";
import { CategoriesTable } from "../_components/table";
import { CategoryPagination } from "../_components/category-pagination";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function DestinationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categories = await getTrashedCategories(
    params.page ? parseInt(params.page) : 1
  );

  return (
    <main className="space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">
          <span className="text-red-600">Trashed</span> Categories
        </h1>
      </div>
      <CategoriesTable data={categories} />
      <CategoryPagination
        data={categories}
        paginationBase="/admin/categories/trashed"
      />
    </main>
  );
}
