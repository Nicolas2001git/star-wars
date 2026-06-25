import { Router } from "express";

import userModel from "../models/users.model.js";
import petModel from "../models/pets.model.js";
import { generateMockUsers, generateMockPets } from "../utils/mocking.js";

const router = Router();

router.get("/", async (req, res) => {
  res.render("home", {
    title: "Galactic Mocking Panel"
  });
});

router.get("/mockingusers-view", async (req, res) => {
  try {
    const usersFromMock = await generateMockUsers(50);

    const users = usersFromMock.map(user => {
      return {
        _id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        petsCount: user.pets ? user.pets.length : 0,
        passwordPreview: user.password ? `${user.password.slice(0, 25)}...` : "No password"
      };
    });

    res.render("mockUsers", {
      title: "Mock Galactic Users",
      users
    });
  } catch (error) {
    res.render("mockUsers", {
      title: "Mock Galactic Users",
      users: [],
      error: error.message
    });
  }
});

router.get("/mockingpets-view", async (req, res) => {
  try {
    const petsFromMock = generateMockPets(100);

    const pets = petsFromMock.map(pet => {
      return {
        _id: pet._id.toString(),
        name: pet.name,
        specie: pet.specie,
        birthDate: pet.birthDate
          ? pet.birthDate.toISOString().split("T")[0]
          : "No birth date",
        adopted: pet.adopted ? "Yes" : "No",
        owner: pet.owner ? pet.owner.toString() : "No owner"
      };
    });

    res.render("mockPets", {
      title: "Mock Galactic Pets",
      pets
    });
  } catch (error) {
    res.render("mockPets", {
      title: "Mock Galactic Pets",
      pets: [],
      error: error.message
    });
  }
});

router.get("/users-view", async (req, res) => {
  try {
    const usersFromDb = await userModel.find().lean();

    const users = usersFromDb.map(user => {
      return {
        _id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        petsCount: user.pets ? user.pets.length : 0,
        passwordPreview: user.password ? `${user.password.slice(0, 25)}...` : "No password"
      };
    });

    res.render("users", {
      title: "Galactic Users",
      users
    });
  } catch (error) {
    res.render("users", {
      title: "Galactic Users",
      users: [],
      error: error.message
    });
  }
});

router.get("/pets-view", async (req, res) => {
  try {
    const petsFromDb = await petModel.find().lean();

    const pets = petsFromDb.map(pet => {
      return {
        _id: pet._id.toString(),
        name: pet.name,
        specie: pet.specie,
        birthDate: pet.birthDate
          ? pet.birthDate.toISOString().split("T")[0]
          : "No birth date",
        adopted: pet.adopted ? "Yes" : "No",
        owner: pet.owner ? pet.owner.toString() : "No owner"
      };
    });

    res.render("pets", {
      title: "Galactic Pets",
      pets
    });
  } catch (error) {
    res.render("pets", {
      title: "Galactic Pets",
      pets: [],
      error: error.message
    });
  }
});

export default router;