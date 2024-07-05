import React, { useReducer } from "react";

type InicialType = {
  count: number;
};

type UpdateActionType = {
  type: "INC" | "DEC";
  payload?: number;
};

type ResetActionType = {
  type: "reset";
};

type CounterAction = UpdateActionType | ResetActionType;

const initialState: InicialType = {
  count: 0,
};

const reducer = (state: InicialType, action: CounterAction): InicialType => {
  switch (action.type) {
    case "INC":
      return { count: state.count + (action.payload || 0) };
    case "DEC":
      return { count: state.count - (action.payload || 0) };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const IncDec = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container flex flex-col items-center mt-3 space-y-2">
      <button
        onClick={() => dispatch({ type: "INC", payload: 10 })}
        className="py-2 px-4 bg-green-500 text-white rounded"
      >
        Increment
      </button>
      <h1 className="text-lg">{state.count}</h1>
      <button
        onClick={() => dispatch({ type: "DEC", payload: 10 })}
        className="py-2 px-4 bg-red-500 text-white rounded"
      >
        Decrement
      </button>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="py-2 px-4 bg-gray-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default IncDec;


// import React, { useReducer } from "react";

// type inicialType = {
//   count: number;
// };
// type actionType = {
//   type: string;
//   payload: number;
// };

// let inicialState = {
//   count: 0,
// };
// const reducer = (state: inicialType, action: actionType) => {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + action.payload };
//     case "decrement":
//       return { count: state.count - action.payload };
//     default:
//       return state;
//   }
// };
// const IncDec = () => {
//   const [state, dispatch] = useReducer(reducer, inicialState);
//   return (
//     <>
//       <div className="container flex justify-center mt-3">
//         <button
//           onClick={() => dispatch({ type: "increment", payload: 10 })}
//           className="py-2 px-2 bg-green-500"
//         >
//           Increment
//         </button>
//          <h1 className="text-lg">{state.count}</h1>
//         <button
//           onClick={() => dispatch({ type: "decrement", payload: 10 })}
//           className="py-2 px-2 bg-red-500"
//         >
//           Decrement
//         </button>
//       </div>
//     </>
//   );
// };

// export default IncDec;
