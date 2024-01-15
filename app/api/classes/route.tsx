import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");
  try {
    const { name } = await req.json();
    const admin = await prisma.admin.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!admin) return new NextResponse("only admin can create classes");
    const Class = await prisma.classes.create({
      data: {
        name,
      },
    });
    if (!Class) return new NextResponse("problem in creating classes");
    return NextResponse.json({
      msg: "class created Sucessfully",
      Class,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error in Post/assignment");
  }
}
