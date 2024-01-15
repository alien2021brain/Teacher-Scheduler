import React from "react";

type Props = {
  title: string;
  description: string;
};

function Heading({ title, description }: Props) {
  return (
    <div className="w-full h-full space-y-2">
      <h2 className="font-bold text-2xl">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default Heading;
