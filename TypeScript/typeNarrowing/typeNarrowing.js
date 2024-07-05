"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function multiType(strs) {
    if (typeof strs === "object") {
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var s = strs_1[_i];
            console.log(s);
        }
    }
    if (typeof strs === "string") {
        console.log(strs);
    }
}
multiType("namwsbsb");
multiType(["apple", "mango", "berry", "banana"]);
var provideId = function (id) {
    if (!id) {
        console.log("id not found plz check");
    }
    console.log(id);
};
provideId(null);
provideId(12);
