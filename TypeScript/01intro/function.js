function addTwo(num) {
  return num + 2;
}
var sum = addTwo(12);
console.log(sum);
function toUpper(str) {
  return str.toUpperCase();
}
var rs = toUpper("Pawan");
console.log(rs);
function signUpUser(name, email, isPaid, mobile) {}
// default para.
var loginUser = function (name, email, isPaid) {
  if (isPaid === void 0) {
    isPaid = false;
  }
};
loginUser("Pawan", "pawan@gmail.com");
//
var checkbResponse = function (num) {
  if (num > 5) {
    return true;
  }
  return "200 ok";
};
var result = checkbResponse(12);
console.log(result);

let heros = ["thor", "spiderman", "ironman"];

heros.map(hero=>{
    return `hero is ${hero}`
})
;