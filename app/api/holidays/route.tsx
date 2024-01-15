import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

type Props = {
  params: {};
};

export async function POST(req: Request, { params }: Props) {
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { month, year, name, date } = await req.json();
    if (!month) return new NextResponse("month is required");
    if (!year) return new NextResponse("year is required");
    if (!name) return new NextResponse("name is required");
    const admin = await prisma.admin.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("only admin can post holidays");
    const holidays = await prisma.holidays.create({
      data: {
        date,
        name,
        year,
        month,
      },
    });

    if (!holidays)
      return new NextResponse("something went wront creating hoidays");
    return NextResponse.json({
      holidays,
      msg: "holiday created sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error in Hoilday/Post");
  }
}
