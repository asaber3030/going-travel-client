import React from "react";
import Link from "next/link";

import { deleteCategory, restoreCategory } from "../_helpers/actions";

import { Category } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/common/delete-modal";
import { RestoreModal } from "@/components/common/restore-modal";
import { Settings2, Trash2, ArchiveRestore, EraserIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  data: Category;
};

export const CategoryActions = ({ data }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' icon={MoreHorizontal} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Category Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!data.deleted_at && (
          <Link href={`/admin/categories/${data.id}/update`} className='p-0 m-0'>
            <DropdownMenuItem className='focus:outline-none'>
              <Settings2 className='h-4 w-4' />
              Edit
            </DropdownMenuItem>
          </Link>
        )}

        {data.deleted_at ? (
          <RestoreModal
            action={restoreCategory}
            id={data.id}
            children={
              <DropdownMenuItem
                onSelect={(value) => {
                  value.preventDefault();
                  value.stopPropagation();
                }}
                className='focus:outline-none'
              >
                <ArchiveRestore className='h-4 w-4' />
                Restore
              </DropdownMenuItem>
            }
          />
        ) : (
          <DeleteModal action={deleteCategory} id={data.id}>
            <DropdownMenuItem className='text-red-500 focus:text-red-500 focus:outline-none'>
              <EraserIcon className='h-4 w-4 text-red-500 ' />
              Delete
            </DropdownMenuItem>
          </DeleteModal>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
