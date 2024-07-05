// interface isn Ts

// interface objType {
//   name: string;
//   mobile: number;
//   func: () => string;
// }

// let obj: objType = {
//   name: "Pawan",
//   mobile: 62332532,
//   func: () => {
//     return "Hello";
//   },
// };
// console.log(obj.name);
// console.log(obj.func());

interface objType {
  name: string;
  mobile: number;
  func: () => string;
  hobbies: string[];
  nestedObj: {
    s: string;
    s2: string;
  };
}

let obj: objType = {
  name: "Pawan",
  mobile: 62332532,
  func: () => {
    return "Hello";
  },
  hobbies: ["dance", "study", "cricket", "movies"],
  nestedObj: {
    s: "Ankit soni",
    s2: "Pardeep",
  },
};

console.log(obj.name); // Output: Pawan
console.log(obj.func()); // Output: Hello
console.log(obj.nestedObj.s); // Output: Ankit soni

// some name interface also declere
interface abc {
  name: string;
}
interface abc {
  age: number;
}

let user1: abc = {
  name: "Pawan",
  age: 12,
};

console.log(user1);

// extends
interface userData1 {
  userName: string;
  mobile: number;
}

interface userData2 extends userData1 {
  age: number;
  email: string;
}

// let fullData: userData1 = {
//   userName: "Pawan Kumar",
//   mobile: 2363785,
// };

let fullData: userData2 = {
  userName: "Pawan Kumar",
  mobile: 2363785,
  age: 23,
  email: "abc@gmail.com",
};
console.log(fullData);
export {};
