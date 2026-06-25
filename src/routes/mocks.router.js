import { Router } from "express";

import { generateMockUsers, generateMockPets } from "../utils/mocking.js";
import userModel from "../models/users.model.js";
import petModel from "../models/pets.model.js";

const router = Router();

const validatePositiveInteger = value => {
  return Number.isInteger(value) && value > 0;
};

const validateNonNegativeInteger = value => {
  return Number.isInteger(value) && value >= 0;
};

router.get("/mockingpets", async (req, res) => {
  try {
    const quantity = req.query.pets ? Number(req.query.pets) : 100;

    if (!validatePositiveInteger(quantity)) {
      return res.status(400).send({
        status: "error",
        message: "La cantidad de mascotas debe ser un número entero mayor a 0."
      });
    }

    const pets = generateMockPets(quantity);

    res.status(200).send({
      status: "success",
      message: `Se generaron ${pets.length} mascotas galácticas correctamente.`,
      payload: pets
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al generar mascotas mockeadas.",
      error: error.message
    });
  }
});

router.get("/mockingusers", async (req, res) => {
  try {
    const quantity = req.query.users ? Number(req.query.users) : 50;

    if (!validatePositiveInteger(quantity)) {
      return res.status(400).send({
        status: "error",
        message: "La cantidad de usuarios debe ser un número entero mayor a 0."
      });
    }

    const users = await generateMockUsers(quantity);

    res.status(200).send({
      status: "success",
      message: `Se generaron ${users.length} usuarios galácticos correctamente.`,
      payload: users
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al generar usuarios mockeados.",
      error: error.message
    });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const usersQuantity = Number(req.body.users);
    const petsQuantity = Number(req.body.pets);

    if (
      !validateNonNegativeInteger(usersQuantity) ||
      !validateNonNegativeInteger(petsQuantity)
    ) {
      return res.status(400).send({
        status: "error",
        message: "Los parámetros users y pets deben ser números enteros iguales o mayores a 0."
      });
    }

    const users = await generateMockUsers(usersQuantity);
    const pets = generateMockPets(petsQuantity);

    const insertedUsers = users.length > 0 ? await userModel.insertMany(users) : [];
    const insertedPets = pets.length > 0 ? await petModel.insertMany(pets) : [];

    res.status(201).send({
      status: "success",
      message: "Datos galácticos generados e insertados correctamente en MongoDB.",
      payload: {
        usersInserted: insertedUsers.length,
        petsInserted: insertedPets.length,
        users: insertedUsers,
        pets: insertedPets
      }
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "Error al generar e insertar datos en la base de datos.",
      error: error.message
    });
  }
});

export default router;