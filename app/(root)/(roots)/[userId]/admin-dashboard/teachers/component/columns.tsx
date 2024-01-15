"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type teacherType = {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  days: string;
};

export const columns: ColumnDef<teacherType>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "emailId",
    header: "Email",
  },
  {
    accessorKey: "days",
    header: "Working Days",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
