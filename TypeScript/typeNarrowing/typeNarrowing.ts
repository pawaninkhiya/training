function multiType(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (let s of strs) {
      console.log(s);
    }
  }
  if (typeof strs === "string") {
    console.log(strs);
  }
}
multiType("namwsbsb");
multiType(["apple", "mango", "berry", "banana"]);

export {};

// let provideId = (id: number | null) => {
//   if (!id) {
//     console.log("id not found plz check");
//   }
//   console.log(id);
// };
// provideId(null);
// provideId(12);
