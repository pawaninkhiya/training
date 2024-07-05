class UserData {
  name: string;
   private email: string;
  readonly city: string = "Hisar";
  constructor(email: string, name: string) {
    this.name = name;
    this.email = email;
  }

}

let user = new UserData("pawan@gmail.com", "Pawan Kumar");

// user.city = "Fatehabad";
// not change readonly city
console.log(user.city);


// console.log(user.email);
// cannot access email because email is private