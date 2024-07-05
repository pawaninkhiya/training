class Employee {
  constructor(public name: string, public age: number) {}

  // getter
  get getName(): string {
    return this.name;
  }
  get getAge(): number {
    return this.age;
  }
  //setter
  set setName(name: string) {
    this.name = name;
  }
}

let newEmp = new Employee("Pawan", 22);

console.log(newEmp.getName);
newEmp.setName = "Ankit Soni";
console.log(newEmp.getName);

export {};
