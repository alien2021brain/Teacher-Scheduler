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
import { teacherType } from "./columns";
import { useParams, useRouter } from "next/navigation";
import ConfirmAlert from "@/components/ui/confirm-alert";
import { Toaster, toast } from "sonner";
import axios from "axios";

type Props = {
  data: teacherType;
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
      const res = await axios.delete(`/api/teachers/${data.id}`);
      if (res.data.msg) toast.success(res.data.msg);
      else toast.error(res.data);
      setTimeout(() => {
        router.refresh();
      }, 1000);
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
        title="Are you Sure Want to Delete Class"
        description="This will delete your class permabtly click continue to perform action"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>

            <Trash onClick={handleOpen} />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}

export default CellActions;
