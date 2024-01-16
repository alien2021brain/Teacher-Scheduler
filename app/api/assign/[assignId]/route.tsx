import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";
import { transporter } from "@/lib/transpoter";

type Props = {
  params: {
    assignId: string;
  };
};

export async function DELETE(req: Request, { params }: Props) {
  const user = User();
  const { assignId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("Only admin can perform this action");

    await prisma.assignments.delete({
      where: {
        id: assignId,
      },
    });

    return NextResponse.json({
      msg: "Entry deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId delte", { status: 400 });
  }
}
// Update
export async function PATCH(req: Request, { params }: Props) {
  const user = User();
  const { assignId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { teacher, classId, day, date } = await req.json();
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("Only admin can perform this action");

    const leave = await prisma.leaves.findFirst({
      where: {
        teacher_id: teacher,
      },
    });
    if (leave?.date === date) return new NextResponse("Teacher is on leave");
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
      return new NextResponse("today is holiday");
    }
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
    await prisma.assignments.update({
      data: {
        class_id: classId,
        teacher_id: teacher,
        day: day,
        date,
      },
      where: {
        id: assignId,
      },
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return new NextResponse("Email not sent");
      } else {
        console.log("Email sent: " + info.response);
        return NextResponse.json({ msg: "Email sent to Teacher" });
      }
    });
    return NextResponse.json({
      msg: "Email not sent",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId patch", { status: 400 });
  }
}
