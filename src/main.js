import express from "express";
import apiRouter from "./routes/index.js";
import appConfig from "./configs/app.config.js";

const app = express();

app.use(express.json());

app.use("/api", apiRouter)

app.listen(appConfig.APP_PORT, () => {
  console.log(`http://localhost:${appConfig.APP_PORT}`);
});
