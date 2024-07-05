import React from "react";

type StyleProps = {
  style: React.CSSProperties;
};
const StyleContainer = (props: StyleProps) => {
  return <div style={props.style}>StyleContainer</div>;
};

export default StyleContainer;
