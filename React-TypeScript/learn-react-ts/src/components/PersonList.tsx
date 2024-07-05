import React from "react";

//array of objects

type names = {
  name: {
    first: string;
    last: string;
  }[];
};
const PersonList = (props: names) => {
  return (
    <div>
      {props.name.map((name) => {
        return (
          <div key={name.first}>
            {name.first} {name.last}
          </div>
        );
      })}
    </div>
  );
};

export default PersonList;
