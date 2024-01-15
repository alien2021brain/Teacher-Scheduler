import prisma from "@/lib/prisma-client";
import React from "react";
import ClassIdForm from "./component/HolydayIdForm";
import { Classes } from "@prisma/client";

type Props = {
  params: {
    userId: string;
    holidayId: string;
  };
};

async function ClassForm({ params }: Props) {
  const holiday = await prisma.holidays.findUnique({
    where: {
      id: params.holidayId,
    },
  });

  return (
    <div>
      <ClassIdForm data={holiday} />
    </div>
  );
}

export default ClassForm;
