"use strict";
// interface isn Ts
Object.defineProperty(exports, "__esModule", { value: true });
var obj = {
    name: "Pawan",
    mobile: 62332532,
    func: function () {
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
var user1 = {
    name: "Pawan",
    age: 12,
};
console.log(user1);
