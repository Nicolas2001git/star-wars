import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

const startServer = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("La variable MONGO_URL no está definida en el archivo .env");
    }

    await mongoose.connect(MONGO_URL);

    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();