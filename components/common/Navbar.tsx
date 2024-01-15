"use client";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import MenuSwitcher from "./MenuSwitcher";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import User from "@/lib/user";
import { toast } from "sonner";
import axios from "axios";

function Navbar() {
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
      path: `/${params.userId}/admin-dashboard`,
      active: path == `/${params.userId}/admin-dashboard`,
    },
    {
      label: "Teachers",
      path: `/${params.userId}/admin-dashboard/teachers`,
      active: path == `/${params.userId}/teachers`,
    },
    {
      label: "Classes",
      path: `/${params.userId}/admin-dashboard/classes`,
      active: path == `/${params.userId}/classes`,
    },
    {
      label: "Holidays",
      path: `/${params.userId}/admin-dashboard/holidays`,
      active: path == `/${params.userId}/holidays`,
    },
    {
      label: "Leaves",
      path: `/${params.userId}/admin-dashboard/leaves`,
      active: path == `/${params.userId}/leaves`,
    },
  ];
  return (
    <nav className="border-b shadow-md mb-10">
      <Container className="h-20 h-wull w-full flex items-center justify-between ">
        <div className="Scheduler">
          <h1 className="font-bold text-3xl">Scheduler</h1>
        </div>
        <div className="flex items-center gap-5">
          <MenuSwitcher menu={Menu} />
          <Button className="rounded-full " onClick={handleSignout}>
            Sign Out
          </Button>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
