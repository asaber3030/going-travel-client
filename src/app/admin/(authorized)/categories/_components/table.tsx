import { PaginatedData, Category } from "@/types";

type Props = {
  data: PaginatedData<Category>;
};

export const CategoriesTable = ({ data }: Props) => {
  if (data?.data?.length === 0) return "Empty";

  return (
    <div>
      {data?.data?.map((category) => (
        <div>{category.id}</div>
      ))}
    </div>
  );
};
