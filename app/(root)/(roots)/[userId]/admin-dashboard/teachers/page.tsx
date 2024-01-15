import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import ClassClient from "./component/TeacherClient";
import { teacherType } from "./component/columns";

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

  const teacher = await prisma.teacher.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedData: teacherType[] = teacher.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    emailId: item.emailId,
    days: item.days,
  }));

  return (
    <div className="w-full h-full">
      <ClassClient data={formattedData} />
    </div>
  );
}

export default Classes;
