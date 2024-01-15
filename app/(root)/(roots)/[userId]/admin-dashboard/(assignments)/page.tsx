import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import ClassClient from "./component/AssignClient";
import { assignType } from "./component/columns";

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

  const assignments = await prisma.assignments.findMany({
    include: {
      class: true,
      teacher: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const leaves = await prisma.leaves.findMany({
    include: {
      teacher: true,
    },
  });
  const formattedData: assignType[] = assignments.map((item) => ({
    id: item.id,
    day: item.day,
    date: item.date,
    class: item.class.name,
    firstName: item.teacher.firstName,
    lastName: item.teacher.lastName,
    emailId: item.teacher.emailId,
    leaveId: "",

    leave: false,
  }));
  const le = leaves.map((item) => ({
    leaveId: item.id,
    firstName: item.teacher.firstName,
    lastName: item.teacher.lastName,
    emailId: item.teacher.emailId,

    leave: item.id ? true : false,
  }));
  formattedData.push(...le);

  return (
    <div className="w-full h-full">
      <ClassClient data={formattedData} />
    </div>
  );
}

export default Classes;
