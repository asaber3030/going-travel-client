"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { showResponse } from "@/lib/utils";

import { LoadingButton } from "@/components/common/loading-button";
import { ApiResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface Props {
  id: number;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  type: string;
  asChild?: boolean;
  action: (id: number, type: string) => Promise<ApiResponse<any>>;
}

export const TourItemDeleteModal = ({
  dialogTitle = "Delete Action",
  dialogDescription = "Are you sure that you want to delete this item?",
  id,
  type,
  children,
  asChild = true,
  action
}: Props) => {
  const [open, setOpen] = useState(false);

  const forceDeleteMutation = useMutation({
    mutationFn: () => action(id, type),
    onSuccess: (data) =>
      showResponse(data, () => {
        setOpen(false);
      })
  });

  const handleDelete = () => {
    forceDeleteMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        {children ? (
          children
        ) : (
          <Button variant='outline-destructive'>
            <Trash size={16} /> Delete
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <LoadingButton
            loading={forceDeleteMutation.isPending}
            variant='outline-destructive'
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
