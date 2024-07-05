

type NameProps = {
  names: {
    first: string;
    last: string;
  }[];
};

const HelloPersonList = (props: NameProps) => {
  return (
    <div>
      {props.names.map((name, i) => {
        return (
          <div key={i}>
            {name.first} {name.last}
          </div>
        );
      })}
    </div>
  );
};

export default HelloPersonList;
