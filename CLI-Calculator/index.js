"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
function main() {
    var firstStr = (0, readline_sync_1.question)("Enter first number \n");
    var operator = (0, readline_sync_1.question)("Enter  operator \n");
    var secondStr = (0, readline_sync_1.question)("Enter first number \n");
    var inputIsValid = isNumber(firstStr) && isOpreator(operator) && isNumber(secondStr);
    console.log(inputIsValid);
    if (inputIsValid) {
        var firstNum = parseInt(firstStr);
        var secondNum = parseInt(secondStr);
    }
}
main();
function isNumber(str) {
    var mybeNum = parseInt(str);
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
function calculate(firstNum, operator, secondNum) {
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
