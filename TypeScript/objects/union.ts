type User = {
  name: string;
  isActive: boolean;
};

type Admin = {
  userName: string;
  isActive: boolean;
};

let pawan: User | Admin = { name: "Pawan", isActive: true };
pawan = { userName: "Syam", isActive: true };

console.log(pawan);

const getId = (id: number | string) => {
  if (typeof id === "string") {
    console.log(`id is string ${id}`);
  } else {
    console.log(`id is number ${id}`);
  }
};

getId("12");
getId(12);

let data: (number | string)[] = ["12212", 3, 3, 3, 3, 2, 2, 33];
console.log(data);

let options: "A" | "B" | "C";
// options="D"  // give error
options = "A";
console.log(options);
