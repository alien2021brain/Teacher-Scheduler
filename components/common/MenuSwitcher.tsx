import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  menu: {
    label: string;
    path: string;
    active: boolean;
  }[];
};

function MenuSwitcher({ menu }: Props) {
  return (
    <div className="right">
      <div className="flex items-center gap-5">
        {menu.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={cn("text-muted-foreground")}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MenuSwitcher;
