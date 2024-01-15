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
  if (!user) return new NextResponse("you are not authorized");
  try {
    const admin = await prisma.admin.findMany({
      where: {
        id: user.id,
      },
    });
    let teacher;
    if (!admin) {
      teacherId == user.Id
        ? (teacher = await prisma.teacher.findUnique({
            where: {
              id: teacherId,
            },
          }))
        : new NextResponse("you cannot get this teacher");
    } else {
      teacher = await prisma.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });
    }

    return NextResponse.json({
      teacher,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at Get/Teacher");
  }
}
// delete
export async function DELETE(req: Request, { params }: Props) {
  const { teacherId } = params;
  console.log(teacherId);
  const user = User();
  if (!user) return new NextResponse("you are not authorized");
  try {
    const admin = await prisma.admin.findMany({
      where: {
        id: user.id,
      },
    });

    if (!admin) {
      return new NextResponse("you cannot delete this teacher");
    }
    const teacher = await prisma.teacher.delete({
      where: {
        id: teacherId,
      },
    });

    return NextResponse.json({
      msg: "teacher deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at Delete/Teacher");
  }
}
// patch
// Update
export async function PATCH(req: Request, { params }: Props) {
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  const { teacherId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { firstName, lastName, emailId, days } = await req.json();

    await prisma.teacher.update({
      data: {
        firstName,
        lastName,
        emailId,
        days,
      },
      where: {
        id: teacherId,
      },
    });

    return NextResponse.json({
      msg: "Assignment updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId patch", { status: 400 });
  }
}
