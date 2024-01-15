import React from "react";
import Navbar from "@/components/common/Navbar";

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  return (
    <div className="h-full w-full">
      <Navbar />

      {children}
    </div>
  );
}

export default AdminLayout;
