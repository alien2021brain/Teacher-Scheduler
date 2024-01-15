"use client";
import React, { useState } from "react";
import { Delete, Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { leavesType } from "./columns";
import { useParams, useRouter } from "next/navigation";
import ConfirmAlert from "@/components/ui/confirm-alert";
import { Toaster, toast } from "sonner";
import axios from "axios";

type Props = {
  data: leavesType;
};

function CellActions({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAction = async () => {
    try {
      const res = await axios.delete(`/api/leaves/${data.id}`);
      if (res.data.msg) toast.success(res.data.msg);
      else toast.error(res.data);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  };

  return (
    <div>
      <Toaster richColors />
      <ConfirmAlert
        handleAction={handleAction}
        open={open}
        setOpen={setOpen}
        title="Are you Sure Want to Delete This Entry"
        description="This will delete your Leave permabtly click continue to perform action"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleOpen}
            className="flex items-center gap-2"
          >
            <p className="text-muted-foreground">Delete Entry</p>
            <Trash className="text-muted-foreground" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default CellActions;
