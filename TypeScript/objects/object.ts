const user = {
  name: "Pawan",
  mobileNumber: 7338979384,
  isActive: true,
};

function createUser({ name: string, isPaid: boolean }) {}

function signUser({ name, mobile }): {} {
  return { name: "Pawan", mobile: 36276287 };
}
// console.log(signUser({ name: "Pawan", mobile: 62337834 }));

export {};

// type aliases

// type User = {
//   name: string;
//   email: string;
//   isActive: boolean;
// };

// function createUsers(user: User): User {
//   return user;
// }
// const rs = createUsers({ name: "", email: "", isActive: true });
// console.log(rs);

// readOnly property

// type User = {
//   readonly id: number;
//   name: string;
//   mobile: number;
//   email: string;
// };

// let myUser: User = {
//   id: 437987,
//   name: "Pawan",
//   mobile: 325854,
//   email: "ags@ds",
// };
// // myUser.id =437834  throw error

// myUser.name="Syam"
// console.log(myUser);

// union types in ts


