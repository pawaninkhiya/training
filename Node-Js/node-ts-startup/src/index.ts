import express,{Application,Request,Response} from "express";

let app = express();
let PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Port is listen in ${PORT}`);
});
