import React from 'react'
import { Text } from './components/PolymorphicComponents/Text'

const App = () => {
  return (
    <div>

      <Text color='primary' size='sm' as='h1' >Hello</Text>
    </div>
  )
}

export default App

// import GenericApp from "./components/react-class-com/generic -props/GenericApp";
// import RandomNumber from "./components/Restriction/RandomNumber";
// import Toast from "./components/TemplateLiteralsandExclude/Toast";
// import CustomButton from "./components/WrappingHTMLElements/Button";
// import Input from "./components/WrappingHTMLElements/Input";


// const App = () => {
//   return (
//     <div>
//      {/* <GenericApp/> */}
//      {/* <RandomNumber value={10} isPositive/> */}
//      {/* <Toast position="left-bottom"/> */}
//      <CustomButton variant="secondary">Secondary Button</CustomButton>
//       <div>
//       <Input type="text" placeholder="Enter Your Name" className="border py-2 px-3 m-3 rounded-sm focus:border-purple-500 active:border-purple-400" />
//       <Input type="number" placeholder="Enter Your Mobile" className="border py-2 px-3 m-3 rounded-sm focus:border-purple-500 active:border-purple-400" />
//       <Input type="email" placeholder="Enter Your Email" className="border py-2 px-3 m-3 rounded-sm focus:border-purple-500 active:border-purple-400" />
//       <Input type="password" placeholder="Enter Your Password" className="border py-2 px-3 m-3 rounded-sm focus:border-purple-500 active:border-purple-400" />
//       </div>
//     </div>
//   );
// };

// export default App;

//class components

// // import React from "react";
// // import Counter from "./components/react-class-com/Counter";
// import Private from "./components/react-class-com/Private";
// import Profile from "./components/react-class-com/Profile";

// const App = () => {
//   return (
//     <div>
//       {/* <Counter  message='Counter value is : '/> */}
//       <Private isLoggedIn={false} component={Profile} />
//     </div>
//   );
// };

// export default App;

// use ref

// import DomRef from "./components/useRef/DomRef";

// const App = () => {
//   return (
//     <div className="flex justify-center mt-4">
//        <DomRef/>

//     </div>
//   );
// };
// export default App;

// import User from "./components/context/User";
// import AuthContextProvider from "./components/context/UserContext";

// const App = () => {
//   return (
//     <div className="flex justify-center mt-4">
//       <AuthContextProvider>
//         <User />
//       </AuthContextProvider>

//     </div>
//   );
// };
// export default App;

// context api first example

// import React from "react";
// import ThemeContextProvider from "./components/context/ThemeContext";
// import Box from "./components/context/Box";

// const App = () => {
//   return (
//     <div>
//       <ThemeContextProvider>
//         <Box />
//       </ThemeContextProvider>
//     </div>
//   );
// };

// export default App;

// import React from 'react'
// import EventProps from './components/event-props/EventProps'
// import StyleApp from './components/style-props/StyleApp'
// import UseStateApp from './components/use-state-hook/UseStateApp'
// import IncDec from './components/userReducerHook/IncDec'

// const App = () => {
//   return (
//     <div>
//       {/* <EventProps/> */}
//       {/* <StyleApp/> */}
//       {/* <UseStateApp/>   */}
//       <IncDec/>
//     </div>
//   )
// }

// export default App

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
