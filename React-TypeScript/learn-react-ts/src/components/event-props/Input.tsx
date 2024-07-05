import React from "react";

type InputProps = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = (props: InputProps) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log(event);
  };
  return (
    // both are same props.handleClick and handleInputChange
    <input type="text" value={props.value} onChange={handleInputChange} />
    // <input type="text" value={props.value} onChange={props.handleChange} />
  );
};

export default Input;
