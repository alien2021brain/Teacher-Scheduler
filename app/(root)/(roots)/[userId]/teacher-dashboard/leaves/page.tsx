import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import LeaveClient from "./component/LeaveClient";
import { leavesType } from "./component/columns";

type Props = {};

async function Classes({}: Props) {
  const user = User();
  if (!user) redirect("/");

  const leaves = await prisma.leaves.findMany({
    where: {
      teacher_id: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedData: leavesType[] = leaves.map((item) => ({
    id: item.id,

    date: item.date,
    month: item.month,
    year: item.year,
    reason: item.reason,
  }));

  return (
    <div className="w-full h-full">
      <LeaveClient data={formattedData} />
    </div>
  );
}

export default Classes;
