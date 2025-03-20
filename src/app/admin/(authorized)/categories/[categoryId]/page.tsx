import { notFound } from "next/navigation";
import { getCategory } from "../_helpers/actions";
import { SingleCategoryComponent } from "../_components/single-category";

type Props = {
  params: Promise<{ categoryId: string }>;
};

export default async function SingleCategory({ params }: Props) {
  const { categoryId } = await params;
  const categoryData = await getCategory(Number(categoryId));
  if (!categoryData) return notFound();

  return <SingleCategoryComponent categoryData={categoryData} />;
}
