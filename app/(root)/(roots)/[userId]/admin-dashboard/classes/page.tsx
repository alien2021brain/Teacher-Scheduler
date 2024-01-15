import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import ClassClient from "./component/ClassClient";
import { classType } from "./component/columns";

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

  const classes = await prisma.classes.findMany();
  const formattedData: classType[] = classes.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div className="w-full h-full">
      <ClassClient data={formattedData} />
    </div>
  );
}

export default Classes;
