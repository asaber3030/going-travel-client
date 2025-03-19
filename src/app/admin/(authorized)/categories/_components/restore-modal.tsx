"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { showResponse } from "@/lib/utils";

import { LoadingButton } from "@/components/common/loading-button";

import { Button } from "@/components/ui/button";
import { Redo2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APIResponse } from "@/types";

interface Props {
  id: number;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  action: (id: number) => Promise<APIResponse<any>>;
}

export const RestoreModal = ({
  dialogTitle = "Restore Action",
  dialogDescription = "Are you sure that you want to restore this item?",
  id,
  children,
  asChild = true,
  action,
}: Props) => {
  const [open, setOpen] = useState(false);

  const restoreMutation = useMutation({
    mutationFn: () => action(id),
    onSuccess: (data) =>
      showResponse(data, () => {
        setOpen(false);
      }),
  });

  const handleDelete = () => {
    restoreMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        {children ? (
          children
        ) : (
          <Button variant="outline-primary" size="icon">
            <Redo2 className="size-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <LoadingButton
            loading={restoreMutation.isPending}
            variant="outline-primary"
            onClick={handleDelete}
          >
            Restore
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
