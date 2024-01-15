"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type holidayType = {
  id: string;
  month: string;
  year: string;
  name: string;
  date: string;
};

export const columns: ColumnDef<holidayType>[] = [
  {
    accessorKey: "name",
    header: "Holiday Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
