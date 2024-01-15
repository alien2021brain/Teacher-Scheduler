"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type teacherType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  emailId?: string;
  workingdays?: string;
  className?: string;
  day?: string;
  date?: string;
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
    accessorKey: "workingdays",
    header: "Working Days",
  },
  {
    accessorKey: "className",
    header: "Class Name",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
