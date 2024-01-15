"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./CellActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type leavesType = {
  id: string;

  date: string;
  month: string;
  year: string;
  reason: string;
};

export const columns: ColumnDef<leavesType>[] = [
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
    accessorKey: "reason",
    header: "Reason",
  },
];
