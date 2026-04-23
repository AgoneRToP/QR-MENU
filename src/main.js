import express from "express";
import apiRouter from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", apiRouter)

app.listen(2469, () => {
  console.log(`http://localhost:${2469}`);
});
