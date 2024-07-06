import React from "react";
import GenericList from "./GenericList";

const GenericApp = () => {
  return (
    <>
      {/* <GenericList
        items={["Pawan Kumar", "Ankit Kumar",3, "Sanjay", "Sumit",787,true]}
        onClick={(item) => console.log(item)}
      />
      <GenericList
        items={[12, 2, 3, 3, 2, 2 , 2]}
        onClick={(item) => console.log(item)}
      /> */}
      <GenericList
        items={[
          { id: 1, first: "Pawan", last: "Kumar" },
          { id: 2, first: "Sahil", last: "Inkhiya" },
          { id: 3, first: "Pardeep", last: "Muhal" },
          { id: 4, first: "Syam", last: "Radhe" },
        ]}
        onClick={(item) => console.log(item)}
      />
    </>
  );
};

export default GenericApp;
