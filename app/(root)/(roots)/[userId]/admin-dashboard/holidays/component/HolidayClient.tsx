"use client";
import React from "react";
import { DataTable } from "./data-table";
import { holidayType, columns } from "./columns";
import Heading from "@/components/common/Heading";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: holidayType[];
};

function ClassClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="w-full">
      <Container className="space-y-5">
        <div className="flex items-center justify-between">
          <Heading title="Holidays" description="you can mange holidays here" />
          <Button
            onClick={() =>
              router.push(`/${params.userId}/admin-dashboard/holidays/new`)
            }
          >
            Add Holiday
          </Button>
        </div>
        <Separator />

        <DataTable columns={columns} data={data} />
      </Container>
    </div>
  );
}

export default ClassClient;
