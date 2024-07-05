let score: Array<number> = [];

function identityTwo(val: any): any {
  return val;
}

function identityThree<Type>(val: Type): Type {
  return val;
}

// console.log(identityThree("Pawan"));
// console.log(identityThree(12));
// console.log(identityThree(true));
// console.log(identityThree("Ankit kumar"));

// function identityFour<T>(val: T): T {
//   return val;
// }

// interface data {
//   name: string;
//   age: number;
// }

// console.log(identityFour<data>({ name: "Pawan", age: 65 }));
// export {};

interface abc {
  userName: string;
  password: string;
}
let anotherFun = <T extends abc, U>(val1: T, val2: U): object => {
  return {
    val1,
    val2,
  };
};

// Example usage:
const result = anotherFun({ userName: "Pawan", password: "63327862" }, 42);
console.log(result); // Output: { val1: "Hello", val2: 42 }

export {}