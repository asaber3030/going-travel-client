"use client";

import { PaginatedData, Category } from "@/types";
import { CategoryActions } from "./category-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { diffForHumans } from "@/lib/utils";

type Props = {
  data: PaginatedData<Category>;
};

export const CategoriesTable = ({ data }: Props) => {
  if (data?.data?.length === 0) return "Empty";

  return (
    <div>
      <Table className='w-full h-full'>
        <TableHeader>
          <TableRow>
            <TableHead className='pl-8'>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className='text-center'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium pl-8'>{category.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={category.image || "/placeholder.svg"} />
                  <AvatarFallback>{category.name[0] ?? "N/A"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{category.name || "N/A"}</TableCell>
              <TableCell>{diffForHumans(category.created_at)}</TableCell>
              <TableCell>
                <CategoryActions data={category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
