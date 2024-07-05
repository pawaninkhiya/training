type nameType = {
  name: {
    first: string;
    last: string;
  };
};

const Person = (props: nameType) => {
  return <h4>{props.name.first} {props.name.last}</h4>;
};

export default Person;
