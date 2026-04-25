import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";

import { connectDB } from "./configs/database.js";
import appConfig from "./configs/app.config.js";

import { NotFoundException } from "./exceptions/not-found.exception.js";

// routes
import homeRouter from "./routes/home.js";
import apiRouter from "./routes/index.js";

const app = express();

// HBS
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(process.cwd(), "src", "views", "layouts"),
    partialsDir: path.join(process.cwd(), "src", "views", "partials"),
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(process.cwd(), "src", "views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// static
app.use("/public", express.static(path.join(process.cwd(), "src", "public")));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// DB
connectDB()
  .then(() => console.log("DB connected"))
  .catch(console.log);

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// routes
app.use("/", homeRouter);
app.use("/api", apiRouter);

// auth pages
app.get("/auth/login", (req, res) => {
  res.render("login", { cssFile: "auth" });
});
app.get("/auth/register", (req, res) => {
  res.render("register", { cssFile: "auth" });
});
app.get("/products", (req, res) => {
  res.render("product", { cssFile: "style" });
});
app.get("/categories", (req, res) => {
  res.render("category", { cssFile: "style" });
});
app.get("/feedback", (req, res) => {
  res.render("feedback", { cssFile: "style" });
});

app.all("*splat", (req, res) => {
  throw new NotFoundException(`Given URL: ${req.url} not found`);
});

app.listen(appConfig.APP_PORT, () => {
  console.log(`http://localhost:${appConfig.APP_PORT}`);
});
