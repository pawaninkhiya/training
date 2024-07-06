import { Component, ReactNode } from "react";

type CounterStateType = {
  count: number;
};
type CounterPropsType = {
  message: string;
};
class Counter extends Component<CounterPropsType, CounterStateType> {
  state = {
    count: 0,
  };

  handleClick = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };
  render(): ReactNode {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        <div>
          {this.props.message} {this.state.count}
        </div>
      </div>
    );
  }
}

export default Counter

// import { count } from "console";
// import { Component } from "react";

// type CounterType = {
//   count: number;
// };
// type CounterProps = {
//   message: string;
// };

// class Counter extends Component<CounterProps, CounterType> {
//   state = {
//     count: 0,
//   };

//   handleClick = () => {
//     this.setState((prevValue) => ({ count: prevValue.count + 1 }));
//   };
//   render() {
//     return (
//       <div>
//         <button onClick={this.handleClick}>Increment</button>
//         <div>
//           {this.props.message} {this.state.count}
//         </div>
//       </div>
//     );
//   }
// }

// export default Counter;
