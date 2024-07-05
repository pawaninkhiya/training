import React from "react";

type oscarProps = {
  children: React.ReactNode;
};
const Oscar = (props: oscarProps) => {
  return <div>{props.children}</div>;
};

export default Oscar;
