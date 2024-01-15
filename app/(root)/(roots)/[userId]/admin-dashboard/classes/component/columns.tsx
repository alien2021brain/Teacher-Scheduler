"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type classType = {
  id: string;
  name: string;
};

export const columns: ColumnDef<classType>[] = [
  {
    accessorKey: "name",
    header: "Class Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
