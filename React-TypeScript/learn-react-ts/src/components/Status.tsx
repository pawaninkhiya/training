type statusProps = {
    status: "loading" | "success" | "error";
};
const Status = (props: statusProps) => {
  let message;
  if (props.status === "loading") {
    message = "loading"
  } else if (props.status === "success") {
    message = "fetched Data successfully !";
  } else if (props.status === "error") {
    message = "error Fetcheding data";
  }
  return <div>{message}</div>;
};

export default Status;
