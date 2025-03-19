import { UpdateCategoryForm } from "../../_components/update-form";
import { getCategory } from "../../_components/actions";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ categoryId: string }>;
};

export default async function UpdateCategoryPage({ params }: Props) {
  const { categoryId } = await params;

  const category = await getCategory(Number(categoryId));

  if (!category) return notFound();

  return (
    <div>
      <UpdateCategoryForm
        id={category.id}
        translations={category.translations}
        category={category}
      />
    </div>
  );
}
