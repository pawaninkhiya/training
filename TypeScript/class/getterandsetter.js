"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = /** @class */ (function () {
    function Employee(name, age) {
        this.name = name;
        this.age = age;
    }
    Object.defineProperty(Employee.prototype, "getName", {
        // getter
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "getAge", {
        get: function () {
            return this.age;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "setName", {
        //setter
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var newEmp = new Employee("Pawan", 22);
console.log(newEmp.getName);
newEmp.setName = "Ankit Soni";
console.log(newEmp.getName);
