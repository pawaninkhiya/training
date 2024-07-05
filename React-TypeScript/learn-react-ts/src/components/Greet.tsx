import Person from "./Person";
import PersonList from "./PersonList";

type greetTypes = {
  name: string;
  messageCount?: number;
  isLogggedIn: boolean;
};
const Greet = (props: greetTypes) => {
  let { messageCount = 0 } = props;
  let name = {
    first: "Pawan",
    last: "Kumar",
  };

  let UserList = [
    {
      first: "Ankit",
      last: "Kumar",
    },
    {
      first: "Syam",
      last: "Kumar",
    },
    {
      first: "Prem",
      last: "Mehra",
    },
    {
      first: "Sahil",
      last: "Sihag",
    },
  ];
  return (
    <>
      {props.isLogggedIn ? (
        <div>
          Wlc {props.name} ! you {props.messageCount} unread messages
        </div>
      ) : (
        "Welccome Guest"
      )}
      <Person name={name} />
      <PersonList name={UserList} />
    </>
  );
};
export default Greet;
