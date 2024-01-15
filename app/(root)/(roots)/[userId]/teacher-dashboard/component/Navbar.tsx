"use client";
import React from "react";
import Container from "@/components/common/Container";
import Link from "next/link";
import MenuSwitcher from "@/components/common/MenuSwitcher";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";

function NavbarTeacher() {
  const path = usePathname();
  const params = useParams();
  const router = useRouter();
  const handleSignout = async () => {
    try {
      const res = await axios.delete(`/api/signout`);
      toast.success(res.data);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Api Error");
    }
  };

  const Menu = [
    {
      label: "Dashboard",
      path: `/${params.userId}/teacher-dashboard`,
      active: path == `/${params.userId}/teacher-dashboard`,
    },
    {
      label: "Holidays",
      path: `/${params.userId}/teacher-dashboard/holidays`,
      active: path == `/${params.userId}/teacher-dashboard/holidays`,
    },
    {
      label: "Leaves",
      path: `/${params.userId}/teacher-dashboard/leaves`,
      active: path == `/${params.userId}/teacher-dashboard/leaves`,
    },
  ];
  return (
    <nav className="border-b shadow-md mb-10">
      <Container className="h-20 h-wull w-full flex items-center justify-between ">
        <div className="Scheduler">
          <h1 className="font-bold text-3xl">Scheduler</h1>
        </div>
        <div className="flex  items-center gap-5">
          <MenuSwitcher menu={Menu} />
          <Button className="rounded-full " onClick={handleSignout}>
            Sign Out
          </Button>
        </div>
      </Container>
    </nav>
  );
}

export default NavbarTeacher;
