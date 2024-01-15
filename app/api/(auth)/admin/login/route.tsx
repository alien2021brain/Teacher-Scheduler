import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma-client";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
export async function POST(req: Request, res: NextApiRequest) {
  const { emailId, password } = await req.json();
  try {
    if (!emailId) {
      return new NextResponse("email is required");
    }
    if (!password) {
      return new NextResponse("password is required");
    }
    console.log(emailId);
    let user = await prisma.admin.findFirst({
      where: {
        emailId,
      },
    });
    console.log(user)

    if (!user) {
      return new NextResponse("user not present");
    }
    const commparePassword = await bcrypt.compare(password, user.password);
    if (!commparePassword) {
      return new NextResponse("you entered a wrong password");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "qwerty", {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully 😊 👌",
    });
    response.cookies.set("login_token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return new NextResponse("something went wrong");
  }
}
