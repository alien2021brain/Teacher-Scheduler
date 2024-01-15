import prisma from "@/lib/prisma-client";
import React from "react";

import User from "@/lib/user";
import { redirect } from "next/navigation";
import TeacherForm from "./component/TeacherForm";

type Props = {
  params: {
    userId: string;
  };
};

async function ClassForm({ params }: Props) {
  const user = User();
  if (!user) redirect("/login");
  const teacher = await prisma.teacher.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div>
      <TeacherForm data={teacher} />
    </div>
  );
}

export default ClassForm;
