import React from "react";
import Link from "next/link";

import { Location } from "@/types";
import { deleteLocation, restoreLocation } from "../_helpers/actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArchiveRestore, EraserIcon, MoreHorizontal, Settings2, Trash2 } from "lucide-react";
import { DeleteModal } from "@/app/admin/(authorized)/_components/delete-modal";
import { RestoreModal } from "@/components/common/restore-modal";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/route";

type Props = {
  data: Location;
};

export const LocationActions = ({ data }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' icon={MoreHorizontal} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Locations Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!data.deleted_at && (
          <Link href={routes.locations.edit(data.id)} className='p-0 m-0'>
            <DropdownMenuItem className='focus:outline-none'>
              <Settings2 className='h-4 w-4' />
              Edit
            </DropdownMenuItem>
          </Link>
        )}

        {data.deleted_at ? (
          <RestoreModal action={restoreLocation} id={data.id}>
            <DropdownMenuItem className='focus:outline-none'>
              <ArchiveRestore className='h-4 w-4' />
              Restore
            </DropdownMenuItem>
          </RestoreModal>
        ) : (
          <DeleteModal action={deleteLocation} id={data.id}>
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
