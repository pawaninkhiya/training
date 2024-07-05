"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var score = [];
function identityTwo(val) {
    return val;
}
function identityThree(val) {
    return val;
}
var anotherFun = function (val1, val2) {
    return {
        val1: val1,
        val2: val2,
    };
};
// Example usage:
var result = anotherFun({ userName: "Pawan", password: "63327862" }, 42);
console.log(result); // Output: { val1: "Hello", val2: 42 }
