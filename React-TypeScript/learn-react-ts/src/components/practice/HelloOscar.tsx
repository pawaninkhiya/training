import React from "react";

type ChildProps = {
  children: React.ReactNode;
};
const HelloOscar = (props: ChildProps) => {
  return <div>{props.children}</div>;
};

export default HelloOscar;
