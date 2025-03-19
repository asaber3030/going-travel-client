import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { showResponse } from "@/lib/utils";

import { LoadingButton } from "@/components/common/loading-button";
import { APIResponse } from "@/types";
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
  DialogTrigger,
} from "@/components/ui/dialog";


interface Props {
  id: number;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  redirect?: () => void;
  action: (id: number) => Promise<APIResponse<any>>;
}

export const DeleteModal = ({
  dialogTitle = "Delete Action",
  dialogDescription = "Are you sure that you want to delete this item?",
  id,
  children,
  asChild = true,
  action,
  redirect,
}: Props) => {
  const [open, setOpen] = useState(false);

  const forceDeleteMutation = useMutation({
    mutationFn: () => action(id),
    onSuccess: (data) =>
      showResponse(data, () => {
        setOpen(false);
       redirect && redirect();
      }),
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
          <Button variant="outline-destructive" size="icon">
            <Trash className="size-4" />
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
            loading={forceDeleteMutation.isPending}
            variant="outline-destructive"
            onClick={handleDelete}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
