import React from "react";

type HorizotalPosition = "left" | "center" | "right";
type VerticalPosition = "top" | "center" | "bottom";
type ToastPositionProps = {
  position:
    | Exclude<`${HorizotalPosition}-${VerticalPosition}`, "center-center">
    | "center";
};
const Toast = ({ position }: ToastPositionProps) => {
  return <div>Toast Notifiction Position {position}</div>;
};

export default Toast;
