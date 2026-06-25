import { Router } from "express";
import petModel from "../models/pets.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pets = await petModel.find().populate("owner").lean();

    res.status(200).send({
      status: "success",
      message: "Mascotas obtenidas correctamente.",
      payload: pets
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al obtener mascotas.",
      error: error.message
    });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const pet = await petModel.findById(pid).populate("owner").lean();

    if (!pet) {
      return res.status(404).send({
        status: "error",
        message: "Mascota no encontrada."
      });
    }

    res.status(200).send({
      status: "success",
      message: "Mascota obtenida correctamente.",
      payload: pet
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al obtener mascota.",
      error: error.message
    });
  }
});

export default router;