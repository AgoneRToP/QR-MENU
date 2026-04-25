import express from "express";
import apiRouter from "./routes/index.js";
import appConfig from "./configs/app.config.js";
import path from "node:path";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/database.js";

const app = express();

app.engine(`hbs`, engine({ extname: `hbs` }));
app.set(`view engine`, `hbs`);
app.set(`views`, path.join(process.cwd(), `src`, `views`));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(process.cwd(), "src", "public")));

connectDB()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

app.use("/api", apiRouter);

app
  .get("/register", (req, res) => {
    res.render("register", { cssFile: "auth" });
  })
  .get("/login", (req, res) => {
    res.render("login", { cssFile: "auth" });
  });

app.listen(appConfig.APP_PORT, () => {
  console.log(`http://localhost:${appConfig.APP_PORT}`);
});
