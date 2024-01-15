import prisma from "@/lib/prisma-client";
import React from "react";
import ClassIdForm from "./component/ClassIdForm";
import { Classes } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  params: {
    userId: string;
    assignmentId: string;
  };
};

async function ClassForm({ params }: Props) {
  const assignment = await prisma.admin.findUnique({
    where: {
      id: params.userId,
    },
  });
  if (!assignment) return redirect("/admin");

  const classes = await prisma.classes.findMany({});
  const teachers = await prisma.teacher.findMany({});
  const assign = await prisma.assignments.findUnique({
    where: {
      id: params.assignmentId,
    },
  });

  return (
    <div>
      <ClassIdForm data={teachers} classes={classes} assign={assign} />
    </div>
  );
}

export default ClassForm;
