import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma-client";
import { transporter } from "@/lib/transpoter";
export async function POST(req: Request) {
  const { firstName, lastName, password, emailId, days } = await req.json();
  try {
    if (!firstName) {
      return new NextResponse("name is required");
    }
    if (!lastName) {
      return new NextResponse("email is required");
    }
    if (!password) {
      return new NextResponse("password is required");
    }
    if (!emailId) {
      return new NextResponse("emailId is required");
    }
    if (!days) {
      return new NextResponse("days is required");
    }

    const hash = await bcrypt.hash(password, 10);
    if (!hash) {
      return new NextResponse("something went wrong ceating hsh");
    }
    const user = await prisma.teacher.create({
      data: {
        firstName,
        emailId,
        lastName,
        password: hash,
        days,
      },
    });
    const mailOptions = {
      from: "scheduler2625@gmail.com",
      to: user.emailId,
      subject: "verification",
      html:
        "<h3>Hello</h3>" +
        user?.firstName +
        user?.lastName +
        "<h4>Plz click the link below to verify your account</h4>" +
        "<br/>" +
        `<a href="http://localhost:3000/verify/${user.id}">Click to Verify</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return new NextResponse("Email not sent");
      } else {
        console.log("Email sent: " + info.response);
        return NextResponse.json({ msg: "Email sent" });
      }
    });
    return NextResponse.json({
      msg: "Email sent sucessfully",
    });
  } catch (error) {
    return new NextResponse(`Internal error Signup ${error}`);
  }
}
