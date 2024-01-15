import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma-client";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
export async function POST(req: Request) {
  const { emailId,password:pass, role } = await req.json();
  try {
    if (!emailId) {
      return new NextResponse("email is required");
    }
    if (!pass) {
      return new NextResponse("password is required");
    }
console.log("admin",emailId,pass)
    
    let user = await prisma.teacher.findFirst({
      where: {
        emailId,
      },
    });

    if (!user) {
      return new NextResponse("user not present");
    }
    const commparePassword = await bcrypt.compare(pass, user.password);
    if (!commparePassword) {
      return new NextResponse("you entered a wrong password");
    }
    // jwt check
    const token = jwt.sign({ id: user.id, role: user.role }, "qwerty", {
      expiresIn: "1d",
    });
const {password,...other}=user
    const response = NextResponse.json({
      other
    });
    response.cookies.set("login_token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return new NextResponse("something went wrong");
  }
}
