import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

type Props = {
  params: {
    teacherId: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const { teacherId } = params;

  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("only admin can see");
    const leave = await prisma.leaves.findFirst({
      where: {
        teacher_id: teacherId,
      },
    });
    if (!leave) return new NextResponse("sucess");
    return NextResponse.json({
      msg: "Teacher is on Leave",
      leave,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error in leaves/Post");
  }
}

export async function POST(req: Request, { params }: Props) {
  const { teacherId } = params;

  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("only admin can post holidays");
    const { date, month, year, reason } = await req.json();
    if (!date) return new NextResponse("date is required");
    if (!month) return new NextResponse("month is required");
    if (!year) return new NextResponse("year is required");
    if (!reason) return new NextResponse("reason is required");
    const leave = await prisma.leaves.create({
      data: {
        date,
        month,
        year,
        reason,
        teacher_id: teacherId,
      },
    });
    return NextResponse.json({
      msg: "Leave applied sucessfully",
      leave,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error in leaves/Post");
  }
}
