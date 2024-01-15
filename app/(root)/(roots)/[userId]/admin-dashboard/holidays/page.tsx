import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import ClassClient from "./component/HolidayClient";
import { holidayType } from "./component/columns";

type Props = {};

async function Holidays({}: Props) {
  const user = User();
  if (!user) redirect("/");
  const admin = await prisma.admin.findFirst({
    where: {
      id: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!admin) redirect("/admin");

  const classes = await prisma.holidays.findMany();
  const formattedData: holidayType[] = classes.map((item) => ({
    id: item.id,
    name: item.name,
    month: item.month,
    year: item.year,
    date: item.date,
  }));

  return (
    <div className="w-full h-full">
      <ClassClient data={formattedData} />
    </div>
  );
}

export default Holidays;
