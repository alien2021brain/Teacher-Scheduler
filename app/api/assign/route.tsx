import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

import { transporter } from "@/lib/transpoter";

type Props = {
  params: {};
};

export async function POST(req: Request, { params }: Props) {
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { day, teacher, classId, date } = await req.json();
    if (!day) return new NextResponse("month is required");
    if (!teacher) return new NextResponse("year is required");
    if (!classId) return new NextResponse("classId is required");
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("only admin can post holidays");
    const Teacher = await prisma.teacher.findFirst({
      where: {
        id: teacher,
      },
    });
    const Class = await prisma.classes.findFirst({
      where: {
        id: classId,
      },
    });
    const mailOptions = {
      from: "scheduler2625@gmail.com",
      to: Teacher?.emailId,
      subject: "Assignment",
      html:
        "<h3>Hello</h3>" +
        Teacher?.firstName +
        " " +
        Teacher?.lastName +
        "<h4>you have been assigned</h4>" +
        " " +
        Class?.name +
        " " +
        "on " +
        " " +
        day +
        " " +
        date +
        "<br/>" +
        "<a  href='http://localhost:3000/'>Click to View</a>",
    };
    const assign1 = await prisma.assignments.findMany({
      where: {
        date,
        class_id: classId,
      },
    });

    if (assign1.length) {
      return new NextResponse(
        "multiple teacher cannot assign same class on same day"
      );
    }
    const holiday = await prisma.holidays.findMany({
      where: {
        date,
      },
    });

    if (holiday.length) {
      return new NextResponse("today is holday");
    }
    const leaves = await prisma.leaves.findMany({
      where: {
        date,
        teacher_id: teacher,
      },
    });
    if (leaves.length) {
      return new NextResponse("teacher is on leave");
    }

    const assign = await prisma.assignments.create({
      data: {
        day,
        class_id: classId,
        teacher_id: teacher,
        date,
      },
    });

    if (!assign)
      return new NextResponse("something went wront creating hoidays");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return new NextResponse("Email not sent");
      } else {
        console.log("Email sent: " + info.response);
        return NextResponse.json({ msg: "Email sent to Teacher", assign });
      }
    });

    return NextResponse.json({
      assign,
      msg: "Email not sent ",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error in Hoilday/Post");
  }
}
