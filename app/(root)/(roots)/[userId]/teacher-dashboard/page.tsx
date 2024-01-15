import React from "react";
import TeacherClient from "./component/TeacherClient";
import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";
import { teacherType } from "./component/columns";
import NavbarTeacher from "./component/Navbar";

type Props = {};

async function TeacherDashboard({}: Props) {
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");

  const assignments = await prisma.assignments.findMany({
    where: {
      teacher_id: user.id,
    },
    include: {
      teacher: true,
      class: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedData: teacherType[] = assignments.map((item) => ({
    id: item.teacher.id,
    firstName: item.teacher.firstName,
    lastName: item.teacher.lastName,
    emailId: item.teacher.emailId,
    workingdays: item.teacher.days,
    className: item.class.name,
    day: item.day,
    date: item.date,
  }));

  return (
    <div>
      <TeacherClient data={formattedData} />{" "}
    </div>
  );
}

export default TeacherDashboard;
