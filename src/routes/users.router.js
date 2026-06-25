import { Router } from "express";
import userModel from "../models/users.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find().populate("pets").lean();

    res.status(200).send({
      status: "success",
      message: "Usuarios obtenidos correctamente.",
      payload: users
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al obtener usuarios.",
      error: error.message
    });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await userModel.findById(uid).populate("pets").lean();

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Usuario no encontrado."
      });
    }

    res.status(200).send({
      status: "success",
      message: "Usuario obtenido correctamente.",
      payload: user
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al obtener usuario.",
      error: error.message
    });
  }
});

export default router;