import React from "react";
import ClassLogin from "./ClassLogin";
import { PrivatePropsType } from "./Profile";
type PrivateProps = {
  isLoggedIn: boolean;
  component: React.ComponentType<PrivatePropsType>;
};
const Private = ({ isLoggedIn, component: Component }: PrivateProps) => {
  if (isLoggedIn) {
    return <Component name="Pawan Kumar" />;
  } else {
    return <ClassLogin />;
  }
};

export default Private;
