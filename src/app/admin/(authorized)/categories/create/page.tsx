import { GoBack } from "@/components/common/go-back";
import { CreateCategoryForm } from "../_components/create-form";
import { PageTitle } from "@/components/common/page-title";

export const metadata = {
  title: "Create Category"
};

export default function CreateCategoryPage() {
  return (
    <div>
      <PageTitle label='Create Category'>
        <GoBack />
      </PageTitle>
      <CreateCategoryForm />
    </div>
  );
}
