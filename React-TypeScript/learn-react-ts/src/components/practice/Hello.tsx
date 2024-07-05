import React from "react";

type UserProps = {
  name: string;
  messgaeCount:number,
  isLoggedIn:boolean
};
const Hello = (props: UserProps) => {
  return (
    <>
    {
      props.isLoggedIn ? <div>Welcome {props.name} ! You have {props.messgaeCount} unread messges</div>:"Welocome Guest"
    }
    </>
  )
};

export default Hello;
