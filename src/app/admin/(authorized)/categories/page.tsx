import { getCategories } from "./_components/actions";
import { CategoriesTable } from "./_components/table";

export default async function DestinationsPage() {
  const categories = await getCategories();

  return (
    <div className='space-y-6'>
      <CategoriesTable data={categories} />
    </div>
  );
}
