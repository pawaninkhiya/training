import React from 'react'
import EventProps from './components/event-props/EventProps'

const App = () => {
  return (
    <div>
      <EventProps/>
    </div>
  )
}

export default App


// import React from "react";
// import Hello from "./components/practice/Hello";
// import HelloPerson from "./components/practice/HelloPerson";
// import HelloHeading from "./components/practice/HelloHeading";
// import Oscar from "./components/Oscar";
// import HelloOscar from "./components/practice/HelloOscar";
// import Heading from "./components/Heading";

// const App = () => {
//   let name = {
//     first: "Sanjay",
//     last: "Kumar",
//   };
//   return (
//     <div>
//       <Hello name="Pawan Kumar" messgaeCount={10} isLoggedIn={true} />
//       <HelloPerson name={name} />
//       <HelloHeading>Hello React js with type Script</HelloHeading>
//       <HelloOscar><HelloHeading>Hello Another Props Children Type </HelloHeading></HelloOscar>
//     </div>
//   );
// };

// export default App;

// import Greet from "./components/Greet";
// import Heading from "./components/Heading";
// import Oscar from "./components/Oscar";
// import Status from "./components/Status";

// const App = () => {
//   return (
//     <div>
//       {/* basic imp-ort props type  */}
//       <Greet name="Pawan Kumar" messageCount={12} isLogggedIn={true} />
//       <Status status="error" />
//       <Heading>Heading is here </Heading>
//       <Oscar>
//         <Heading>Hello How are you</Heading>
//       </Oscar>
//     </div>
//   );
// };
// export default App;
