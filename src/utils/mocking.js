import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const starWarsFirstNames = [
  "Luke",
  "Leia",
  "Han",
  "Anakin",
  "Padme",
  "ObiWan",
  "Ahsoka",
  "Rey",
  "Finn",
  "Poe",
  "Lando",
  "Mace",
  "QuiGon",
  "Sabine",
  "Ezra",
  "Cassian",
  "Jyn",
  "Din",
  "Ben",
  "Cal",
  "Boba",
  "Jango",
  "Hera",
  "Kanan",
  "BoKatan"
];

const starWarsLastNames = [
  "Skywalker",
  "Organa",
  "Solo",
  "Kenobi",
  "Tano",
  "Palpatine",
  "Calrissian",
  "Windu",
  "Jinn",
  "Wren",
  "Bridger",
  "Andor",
  "Erso",
  "Djarin",
  "Kestis",
  "Fett",
  "Syndulla",
  "Kryze",
  "Mothma",
  "Tarkin",
  "Vader",
  "Ren"
];

const galacticPlanets = [
  "tatooine",
  "naboo",
  "coruscant",
  "alderaan",
  "hoth",
  "endor",
  "mustafar",
  "kamino",
  "mandalore",
  "dagobah",
  "jakku",
  "scarif",
  "kashyyyk",
  "bespin",
  "geonosis",
  "lothal",
  "yavin"
];

const petNames = [
  "Grogu",
  "Chewie",
  "Porgy",
  "Wampa",
  "Rancor",
  "Boga",
  "Lothie",
  "Taunty",
  "Banthy",
  "Eopie",
  "Fathier",
  "Nexu",
  "Acklay",
  "Reek",
  "Blurrg",
  "Krayt",
  "Varactyl"
];

const petSpecies = [
  "Porg",
  "Tauntaun",
  "Bantha",
  "Loth-cat",
  "Wampa",
  "Rancor",
  "Eopie",
  "Blurrg",
  "Varactyl",
  "Fathier",
  "Nexu",
  "Acklay",
  "Reek",
  "Krayt Dragon"
];

const randomFromArray = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const cleanText = text => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
};

const createRandomBirthDate = () => {
  const currentYear = new Date().getFullYear();

  const randomYear = currentYear - Math.floor(Math.random() * 15) - 1;
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 28) + 1;

  return new Date(randomYear, randomMonth, randomDay);
};

export const generateMockUsers = async quantity => {
  const users = [];

  const encryptedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < quantity; i++) {
    const firstName = randomFromArray(starWarsFirstNames);
    const lastName = randomFromArray(starWarsLastNames);
    const planet = randomFromArray(galacticPlanets);

    const uniqueCode = `${Date.now()}-${i}-${faker.string.alphanumeric(8)}`;

    const email = `${cleanText(firstName)}.${cleanText(lastName)}.${cleanText(uniqueCode)}@${planet}.holonet`;

    const user = {
      _id: new mongoose.Types.ObjectId(),
      first_name: firstName,
      last_name: lastName,
      email,
      password: encryptedPassword,
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(user);
  }

  return users;
};

export const generateMockPets = quantity => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    const pet = {
      _id: new mongoose.Types.ObjectId(),
      name: randomFromArray(petNames),
      specie: randomFromArray(petSpecies),
      birthDate: createRandomBirthDate(),
      adopted: false,
      owner: null,
      image: faker.image.url(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    pets.push(pet);
  }

  return pets;
};