"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const db_1 = require("./src/db/db");
const port = 3000;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// user routes
app.use("/api/user/v1", user_routes_1.default);
// app.use();
app.get("/", (req, resp) => {
    resp.send({
        name: "hello",
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
