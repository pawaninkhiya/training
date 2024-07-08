import { question } from "readline-sync";
type Opreator = "+" | "-" | "*" | "/";
function main() {
  let firstStr: string = question("Enter first number \n");
  let operator: string = question("Enter  operator \n");
  let secondStr: string = question("Enter first number \n");
  let inputIsValid: boolean =
    isNumber(firstStr) && isOpreator(operator) && isNumber(secondStr);
  if (inputIsValid) {
    let firstNum = parseInt(firstStr);
    let secondNum = parseInt(secondStr);
    const result = calculate(firstNum, operator as Opreator, secondNum);
    console.log("result:", result);
  } else {
    console.log("\n invalid input \n");
    main();
  }
}
main();

function isNumber(str: string) {
  let mybeNum = parseInt(str);
  return !isNaN(mybeNum);
}
function isOpreator(operator) {
  switch (operator) {
    case "+":
    case "-":
    case "*":
    case "/":
      return true;
    default:
      return false;
  }
}

function calculate(firstNum: number, operator: string, secondNum: number) {
  switch (operator) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
    case "/":
      return firstNum / secondNum;
  }
}

// import { question } from "readline-sync";
// type Opreator = "+" | "-" | "*" | "/";
// function main() {
//   let firstStr: string = question("Enter First number: \n");
//   let opreator: string = question("Enter operator \n");
//   let secondStr: string = question("Enter second number \n");
//   let inputIsValid: boolean =
//     isNumber(firstStr) && isOpreator(opreator) && isNumber(secondStr);

//   if (inputIsValid) {
//     let firstNum: number = parseInt(firstStr);
//     let secondNum: number = parseInt(secondStr);
//     let result = calculate(firstNum, opreator as Opreator, secondNum);
//     console.log("result :", result);
//   } else {
//     console.log("\n Invalid input !! \n");
//     main();
//   }
// }

// main();

// function isOpreator(opreator: string): boolean {
//   switch (opreator) {
//     case "+":
//     case "-":
//     case "*":
//     case "/":
//       return true;
//     default:
//       return false;
//   }
// }
// function isNumber(str: string): boolean {
//   const mayBeNum = parseInt(str);
//   return !isNaN(mayBeNum);
// }

// function calculate(firstNum: number, operator: string, secondNum: number) {
//   switch (operator) {
//     case "+":
//       return firstNum + secondNum;
//     case "-":
//       return firstNum - secondNum;
//     case "*":
//       return firstNum * secondNum;
//     case "/":
//       return firstNum / secondNum;
//   }
// }
