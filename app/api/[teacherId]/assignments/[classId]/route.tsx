import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

type Props = {
  params: {
    teacherId: string;
    classId: string;
  };
};
export async function POST(req: Request, { params }: Props) {
  const { teacherId, classId } = params;
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  try {
    // sonday monday
    const { day } = await req.json();
    const admin = await prisma.admin.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("only admin can assign");
    const assignment = await prisma.assignments.create({
      data: {
        day,
        class_id: classId,
        teacher_id: teacherId,
      },
    });
    if (!assignment) return new NextResponse("problem in assignment");
    return NextResponse.json({
      assignment,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error in Post/assignment");
  }
}
