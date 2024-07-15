import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const PORT = process.env.PORT;
app.get("/home", (req: Request, res: Response) => {
  res.send("Home Page");
});

app.get("/", (req: Request, res: Response) => {
  res.send("listening");
});

app.get("/about",(req,res)=>{
  res.send("about Page")
})

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
