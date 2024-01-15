"use client";
import React from "react";
import { DataTable } from "./data-table";
import { columns, holidayType } from "./columns";
import Heading from "@/components/common/Heading";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: holidayType[];
};

function HolidayClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="w-full">
      <Container className="space-y-5">
        <div className="flex items-center justify-between">
          <Heading
            title="Holidays"
            description="Here is the list of all the holidays"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center ">
          <DataTable columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
}

export default HolidayClient;
