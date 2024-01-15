import React from "react";
import NavbarTeacher from "./component/Navbar";

type Props = {
  children: React.ReactNode;
};

function LayoutTeacher({ children }: Props) {
  return (
    <div>
      <NavbarTeacher />
      {children}
    </div>
  );
}

export default LayoutTeacher;
