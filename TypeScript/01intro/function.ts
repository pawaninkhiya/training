function addTwo(num: number) {
  return num + 2;
}

let sum = addTwo(12);
console.log(sum);

function toUpper(str: string) {
  return str.toUpperCase();
}

const rs = toUpper("Pawan");
console.log(rs);

function signUpUser(
  name: string,
  email: string,
  isPaid: boolean,
  mobile: number
) {}

// default para.
var loginUser = (name: string, email: string, isPaid: boolean = false) => {};
loginUser("Pawan", "pawan@gmail.com");

//
// var checkbResponse = (num: number):boolean => {
//   if (num > 5) {
//     return true
//   }
//   return "200 ok";
// };

// const result = checkbResponse(12);
// console.log(result);

var getHello = (s: string): string => {
  return ""
};

export{}