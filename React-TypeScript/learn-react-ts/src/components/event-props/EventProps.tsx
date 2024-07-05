import React from "react";
import Button from "./Button";
import Input from "./Input"

const EventProps = () => {
  return (
    <div>
      <Button
        handleClick={(event, id) => {
          console.log("Button Clicked",id);
        }}
      />
      <Input  value="" handleChange={(event)=>console.log(event)} />
    </div>
  );
};

export default EventProps;
