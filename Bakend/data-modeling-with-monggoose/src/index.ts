import express, { Express, Request, Response } from "express";
let app: Express = express();

let PORT = 3000;

app.listen(PORT, () => {
  console.log(`Port listen on ${PORT}`);
});
