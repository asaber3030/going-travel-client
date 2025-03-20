import { getCategory } from "../../_helpers/actions";
import { notFound } from "next/navigation";
import { routes } from "@/lib/route";

import { UpdateCategoryForm } from "../../_components/update-form";
import { Metadata } from "next";
import { PageTitle } from "@/components/common/page-title";
import { LinkBtn } from "@/components/common/button-link";
import { GoBack } from "@/components/common/go-back";
import { Eye } from "lucide-react";

type Props = {
  params: Promise<{ categoryId: string }>;
};

export const metadata: Metadata = {
  title: "Update Category"
};

export default async function UpdateCategoryPage({ params }: Props) {
  const { categoryId } = await params;
  const category = await getCategory(Number(categoryId));
  if (!category) return notFound();

  return (
    <div>
      <PageTitle label={`Update Category - "${category.name}"`}>
        <LinkBtn icon={Eye} href={routes.categories.show(category.id)}>
          Show Details
        </LinkBtn>
        <GoBack />
      </PageTitle>

      <UpdateCategoryForm
        id={category.id}
        translations={category.translations}
        category={category}
      />
    </div>
  );
}
