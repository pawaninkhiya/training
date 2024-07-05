import React from "react";
type hanldeProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};
const Button = (props: hanldeProps) => {
  return (
    <button onClick={(event) => props.handleClick(event, 12)}>Button</button>
  );
};

export default Button;
