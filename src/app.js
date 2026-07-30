import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";

import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import viewsRouter from "./routes/views.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import swaggerSpecs from "./config/swagger.js";

const app = express();

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

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs)
);

app.use("/", viewsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

export default app;