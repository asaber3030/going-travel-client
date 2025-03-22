import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Settings2,
  ArchiveRestore,
  EraserIcon,
  MoreHorizontal,
  Clipboard,
  Globe,
  CheckCheck,
  Users,
  GalleryVerticalIcon,
  Smile
} from "lucide-react";

import { DeleteModal } from "@/app/admin/(authorized)/_components/delete-modal";
import { RestoreModal } from "@/components/common/restore-modal";

import { Button } from "@/components/ui/button";
import { routes } from "@/lib/route";
import { deleteTour, restoreTour } from "../_helpers/actions";

type Props = {
  tourId: number;
  isDeleted: boolean;
};

export const TourActions = ({ tourId, isDeleted }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' icon={MoreHorizontal} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Tour Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isDeleted && (
          <>
            <Link href={routes.tours.edit(tourId)} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <Settings2 className='h-4 w-4' />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link href={routes.tours.changeDetails(tourId, "reviews")} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <Users className='h-4 w-4' />
                Reviews
              </DropdownMenuItem>
            </Link>
            <Link href={routes.tours.changeDetails(tourId, "itineraries")} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <Clipboard className='h-4 w-4' />
                Itineraries
              </DropdownMenuItem>
            </Link>
            <Link href={routes.tours.changeDetails(tourId, "highlights")} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <Smile className='h-4 w-4' />
                Highlights
              </DropdownMenuItem>
            </Link>
            <Link href={routes.tours.edit(tourId)} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <Globe className='h-4 w-4' />
                Translations
              </DropdownMenuItem>
            </Link>
            <Link href={routes.tours.changeDetails(tourId, "images")} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <GalleryVerticalIcon className='h-4 w-4' />
                Images
              </DropdownMenuItem>
            </Link>
            <Link href={routes.tours.changeDetails(tourId, "exclusions")} className='p-0 m-0'>
              <DropdownMenuItem className='focus:outline-none'>
                <CheckCheck className='h-4 w-4' />
                Inclusions & Exclusions
              </DropdownMenuItem>
            </Link>
          </>
        )}

        {isDeleted ? (
          <RestoreModal action={restoreTour} id={tourId}>
            <DropdownMenuItem className='focus:outline-none'>
              <ArchiveRestore className='h-4 w-4' />
              Restore
            </DropdownMenuItem>
          </RestoreModal>
        ) : (
          <DeleteModal action={deleteTour} id={tourId}>
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
