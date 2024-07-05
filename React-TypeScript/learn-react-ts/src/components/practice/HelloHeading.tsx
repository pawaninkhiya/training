type HeadProps = {
  children: string;
};
const HelloHeading = (props: HeadProps) => {
  return <div>{props.children}</div>;
};

export default HelloHeading;
