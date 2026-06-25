import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import viewsRouter from "./routes/views.router.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/", viewsRouter);

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB Atlas connected successfully. Han Solo is waiting for you to continue the adventure!");
  })
  .catch(error => {
    console.log("MongoDB connection error:");
    console.log(error.message);
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Visual panel available at http://localhost:${PORT}`);
});