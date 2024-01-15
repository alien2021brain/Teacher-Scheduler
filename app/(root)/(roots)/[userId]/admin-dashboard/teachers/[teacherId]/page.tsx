import prisma from "@/lib/prisma-client";
import React from "react";
import ClassIdForm from "./component/ClassIdForm";
import { Classes } from "@prisma/client";

type Props = {
  params: {
    userId: string;
    classId: string;
  };
};

async function ClassForm({ params }: Props) {
  const Class = await prisma.classes.findUnique({
    where: {
      id: params.classId,
    },
  });

  return (
    <div>
      <ClassIdForm data={Class} />
    </div>
  );
}

export default ClassForm;
