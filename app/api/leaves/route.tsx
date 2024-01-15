import prisma from "@/lib/prisma-client";
import User from "@/lib/user";
import { NextResponse } from "next/server";
import { transporter } from "@/lib/transpoter";
type Props = {
  params: {};
};

export async function POST(req: Request, { params }: Props) {
  const user = User();
  if (!user) return new NextResponse("you are not authenticated");

  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!teacher) return new NextResponse("only teacher can apply for leave");
    const { date, month, year, reason } = await req.json();
    const leaves = await prisma.leaves.create({
      data: {
        date,
        month,
        year,
        reason,
        teacher_id: user.id,
      },
    });
    if (!leaves) return new NextResponse("Something went rong");
    const mailOptions = {
      from: teacher.emailId,
      to: "scheduler2625@gmail.com",
      subject: "Leave",
      html:
        "<h3>Hello</h3> <br/>" +
        reason +
        "<br/>" +
        "Leave Date" +
        " " +
        date +
        "<br/>" +
        "month" +
        " " +
        month +
        "<br/>" +
        "year" +
        " " +
        year +
        "<br/>" +
        "<a  href='http://localhost:3000/'>Click to View</a>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return new NextResponse("Email not sent");
      } else {
        console.log("Email sent: " + info.response);
        return NextResponse.json({ msg: "Email sent to Teacher" });
      }
    });
    return NextResponse.json({
      msg: "Leaves Applied Sucessfully",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error at Post Leaves");
  }
}
