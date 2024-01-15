import React from "react";
import User from "@/lib/user";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma-client";
type Props = {};

async function Rootmain({}: Props) {
  const user = User();
  if (!user) {
    console.log("you are not autherize");
    redirect("/signup");
  }
  if (user.role == "Admin") return redirect(`/${user.id}/admin-dashboard`);

  const teacher = await prisma.teacher.findFirst({
    where: {
      id: user.id,
    },
  });


  if (teacher?.verify) {
    if (user.role == "Teacher")
      return redirect(`/${user.id}/teacher-dashboard`);
  } else redirect("/login");
}

export default Rootmain;
