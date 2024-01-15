import prisma from "@/lib/prisma-client";
import React from "react";
import LeaveForm from "./component/LeaveForm";
import { Classes } from "@prisma/client";

async function Leave() {
  return (
    <div>
      <LeaveForm />
    </div>
  );
}

export default Leave;
