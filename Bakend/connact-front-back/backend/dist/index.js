"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const jokes = [
    {
        id: 1,
        setup: "Why did the JavaScript developer go broke?",
        punchline: "Because he couldn't array (a raise) his salary!",
    },
    {
        id: 2,
        setup: "Why do JavaScript arrays make terrible boxers?",
        punchline: "Because they always lose track of their length!",
    },
    {
        id: 3,
        setup: "How do you comfort a JavaScript bug?",
        punchline: "You console it.",
    },
    {
        id: 4,
        setup: "Why was the JavaScript array always calm?",
        punchline: "Because it knew how to reduce its stress!",
    },
    {
        id: 5,
        setup: "What did the JavaScript array say to the object?",
        punchline: "You can push my buttons anytime!",
    },
];
app.get("/api/jokes", (req, res) => {
    res.json(jokes);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
