import HelloPersonList from "./HelloPersonList";

type dataProps = {
  name: {
    first: string;
    last: string;
  };
};

let userNames = [
  { first: "Ankit", last: "Soni" },
  { first: "Sanjay", last: "Bishnoi" },
  { first: "Sumit", last: "Muhal" },
  { first: "Pawan", last: "Inkhiya" },
];
const HelloPerson = (props: dataProps) => {
  return (
   <>
    <div>
      {props.name.first}
      {props.name.last}
    </div>
    <HelloPersonList names={userNames}/>
   </>
  );
};

export default HelloPerson;
