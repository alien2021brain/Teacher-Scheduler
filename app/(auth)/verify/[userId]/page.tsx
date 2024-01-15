import prisma from "@/lib/prisma-client";
import { redirect } from "next/navigation";

import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

async function Verify({ params }: Props) {
  const user = await prisma.teacher.findFirst({
    where: {
      id: params.userId,
    },
  });
  if (!user) redirect("/signup");
  const verify = await prisma.teacher.update({
    data: {
      verify: true,
    },
    where: {
      id: params.userId,
    },
  });
  redirect("/login");
}

export default Verify;
