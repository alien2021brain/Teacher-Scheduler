import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

type Props = {
  params: {
    classId: string;
  };
};

export async function DELETE(req: Request, { params }: Props) {
  const user = User();
  const { classId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("Only admin can perform this action");

    await prisma.classes.delete({
      where: {
        id: classId,
      },
    });

    return NextResponse.json({
      msg: "class deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId delte", { status: 400 });
  }
}
// Update
export async function PATCH(req: Request, { params }: Props) {
  const user = User();
  const { classId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { name } = await req.json();
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("Only admin can perform this action");

    await prisma.classes.update({
      data: {
        name,
      },
      where: {
        id: classId,
      },
    });

    return NextResponse.json({
      msg: "class updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId patch", { status: 400 });
  }
}
