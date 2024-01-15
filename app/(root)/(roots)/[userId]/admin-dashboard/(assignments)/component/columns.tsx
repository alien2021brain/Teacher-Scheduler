"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type assignType = {
  id?: string;
  day?: string;
  class?: string;
  firstName: string;
  lastName: string;
  emailId: string;
  leaveId?: string;
  date?: string;

  leave?: boolean;
};

export const columns: ColumnDef<assignType>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "leave",
    header: "Leave",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "day",
    header: "Day",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "emailId",
    header: "Email",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
