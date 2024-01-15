import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

type Props = {
  params: {
    holidayId: string;
  };
};

export async function DELETE(req: Request, { params }: Props) {
  const user = User();
  const { holidayId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("Only admin can perform this action");

    await prisma.holidays.delete({
      where: {
        id: holidayId,
      },
    });

    return NextResponse.json({
      msg: "holiday deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId delte", { status: 400 });
  }
}
// Update
export async function PATCH(req: Request, { params }: Props) {
  const user = User();
  const { holidayId } = params;

  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { name, date, year, month } = await req.json();
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("Only admin can perform this action");

    await prisma.holidays.update({
      data: {
        name,
        date,
        year,
        month,
      },
      where: {
        id: holidayId,
      },
    });

    return NextResponse.json({
      msg: "holiday updated sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at clsssId patch", { status: 400 });
  }
}
