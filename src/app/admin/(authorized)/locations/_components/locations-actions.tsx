import React from "react";
import Link from "next/link";

import { Location } from "@/types";
import { deleteLocation, restoreLocation } from "./actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArchiveRestore, EraserIcon, Settings2, Trash2 } from "lucide-react";
import { RestoreModal } from "../../categories/_components/restore-modal";
import { DeleteModal } from "../../categories/_components/delete-modal";

type Props = {
  data: Location;
};

export const LocationActions = ({ data }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-secondary text-secondary-foreground px-2 py-2 rounded-md shadow-sm hover:bg-slate-200 focus:outline-none transition-all duration-200">
        Actions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Category Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!data.deleted_at && (
          <Link href={`/admin/locations/${data.id}/update`} className="p-0 m-0">
            <DropdownMenuItem className="focus:outline-none">
              <Settings2 className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </Link>
        )}

        {!data.deleted_at && (
          <DropdownMenuItem className="focus:outline-none">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
        {data.deleted_at && (
          <RestoreModal action={restoreLocation} id={data.id}>
            <DropdownMenuItem
              onSelect={(value) => {
                value.preventDefault();
                value.stopPropagation();
              }}
              className="focus:outline-none"
            >
              <ArchiveRestore className="h-4 w-4" />
              Restore
            </DropdownMenuItem>
          </RestoreModal>
        )}
        <DeleteModal action={deleteLocation} id={data.id}>
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500 focus:outline-none"
            onSelect={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <EraserIcon className="h-4 w-4 text-red-500 " />
            Force Delete
          </DropdownMenuItem>
        </DeleteModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
