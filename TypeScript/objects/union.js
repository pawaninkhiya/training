var pawan = { name: "Pawan", isActive: true };
pawan = { userName: "Syam", isActive: true };
console.log(pawan);
var getId = function (id) {
    if (typeof id === "string") {
        console.log("id is string ".concat(id));
    }
    else {
        console.log("id is number ".concat(id));
    }
};
getId("12");
getId(12);
var data = ["12212", 3, 3, 3, 3, 2, 2, 33];
console.log(data);
var options;
// options="D"  // give error
options = "A";
console.log(options);
