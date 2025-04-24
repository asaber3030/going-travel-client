import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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
  Smile,
} from "lucide-react";

import { DeleteModal } from "@/app/admin/(authorized)/_components/delete-modal";
import { RestoreModal } from "@/components/common/restore-modal";

import { Button } from "@/components/ui/button";
import { routes } from "@/lib/route";
import { deleteLimousine, restoreLimousine } from "../_helpers/actions";

type Props = {
  limousineId: number;
  isDeleted: boolean;
};

export const LimousinesActions = ({ limousineId, isDeleted }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" icon={MoreHorizontal} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Limousine Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!isDeleted && (
          <>
            <Link href={routes.limousines.edit(limousineId)} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <Settings2 className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
            <Link href={routes.limousines.changeDetails(limousineId, "images")} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <GalleryVerticalIcon className="h-4 w-4" />
                Images
              </DropdownMenuItem>
            </Link>
            <Link href={routes.limousines.changeDetails(limousineId, "reviews")} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <Users className="h-4 w-4" />
                Reviews
              </DropdownMenuItem>
            </Link>
            <Link href={routes.limousines.changeDetails(limousineId, "overviews")} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <Globe className="h-4 w-4" />
                Overviews
              </DropdownMenuItem>
            </Link>
            <Link href={routes.limousines.changeDetails(limousineId, "specifications")} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <CheckCheck className="h-4 w-4" />
                Specifications
              </DropdownMenuItem>
            </Link>
            <Link href={routes.limousines.changeDetails(limousineId, "features")} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <Smile className="h-4 w-4" />
                Features
              </DropdownMenuItem>
            </Link>
            <Link href={routes.limousines.changeDetails(limousineId, "services")} className="p-0 m-0">
              <DropdownMenuItem className="focus:outline-none">
                <Clipboard className="h-4 w-4" />
                Services
              </DropdownMenuItem>
            </Link>
          </>
        )}

        {isDeleted ? (
          <RestoreModal action={restoreLimousine} id={limousineId}>
            <DropdownMenuItem className="focus:outline-none">
              <ArchiveRestore className="h-4 w-4" />
              Restore
            </DropdownMenuItem>
          </RestoreModal>
        ) : (
          <DeleteModal action={deleteLimousine} id={limousineId}>
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:outline-none">
              <EraserIcon className="h-4 w-4 text-red-500 " />
              Delete
            </DropdownMenuItem>
          </DeleteModal>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
