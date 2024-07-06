import React from "react";

type InputTypeProps = React.ComponentProps<"input">;

const Input = (props: InputTypeProps) => {
  return <input {...props} />;
};

export default Input;
