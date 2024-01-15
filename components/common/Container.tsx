import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
};

function Container({ children, className }: Props) {
  return (
    <div className={cn("container mx-auto md:px-8 px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}

export default Container;
