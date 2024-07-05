var UserData = /** @class */ (function () {
    function UserData(email, name) {
        this.name = name;
        this.email = email;
    }
    return UserData;
}());
var user = new UserData("pawan@gmail.com", "Pawan Kumar");
user.city = "Fatehabad";
console.log(user.city);
