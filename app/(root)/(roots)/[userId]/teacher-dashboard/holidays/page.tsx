import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";
import HolidayClient from "./component/HolidayClient";

type Props = {};

async function Holdays({}: Props) {
  const user = User();
  if (!user) redirect("/");
  const holidays = await prisma.holidays.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <HolidayClient data={holidays} />
    </div>
  );
}

export default Holdays;
