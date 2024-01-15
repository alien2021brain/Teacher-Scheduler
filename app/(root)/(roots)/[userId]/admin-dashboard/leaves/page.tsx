import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import ClassClient from "./component/LeavesClient";
import { leavesType } from "./component/columns";

type Props = {};

async function Classes({}: Props) {
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

  const leaves = await prisma.leaves.findMany({
    include: {
      teacher: true,
    },
  });
  const formattedData: leavesType[] = leaves.map((item) => ({
    id: item.id,
    firstName: item.teacher.firstName,
    lastName: item.teacher.lastName,
    date: item.date,
    month: item.month,
    year: item.year,
    reason: item.reason,
  }));

  return (
    <div className="w-full h-full">
      <ClassClient data={formattedData} />
    </div>
  );
}

export default Classes;
