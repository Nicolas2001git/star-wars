import mongoose from "mongoose";
import { expect } from "chai";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import app from "../src/app.js";
import userModel from "../src/models/users.model.js";
import petModel from "../src/models/pets.model.js";
import adoptionModel from "../src/models/adoptions.model.js";

const requester = supertest(app);

describe("Functional tests for Galactic Adoptions", function () {
  this.timeout(120000);

  let mongoServer;
  let user;
  let pet;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    await adoptionModel.deleteMany({});
    await userModel.deleteMany({});
    await petModel.deleteMany({});

    user = await userModel.create({
      first_name: "Luke",
      last_name: "Skywalker",
      email: "luke@rebellion.com",
      password: "force123",
      role: "user",
      pets: []
    });

    pet = await petModel.create({
      name: "Chewbacca",
      specie: "Wookiee",
      birthDate: new Date("1980-05-04"),
      adopted: false,
      owner: null
    });
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  describe("GET /api/adoptions", () => {
    it("should return all galactic adoptions", async () => {
      const response = await requester.get("/api/adoptions");

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("should return one galactic adoption", async () => {
      const adoption = await adoptionModel.create({
        owner: user._id,
        pet: pet._id
      });

      const response = await requester.get(
        `/api/adoptions/${adoption._id}`
      );

      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.have.property("_id");
      expect(response.body.payload._id).to.equal(
        adoption._id.toString()
      );
    });

    it("should return 400 when the adoption ID is invalid", async () => {
      const response = await requester.get(
        "/api/adoptions/invalid-id"
      );

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
    });

    it("should return 404 when the adoption does not exist", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await requester.get(
        `/api/adoptions/${fakeId}`
      );

      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal("error");
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("should adopt a galactic creature successfully", async () => {
      const response = await requester.post(
        `/api/adoptions/${user._id}/${pet._id}`
      );

      expect(response.status).to.equal(201);
      expect(response.body.status).to.equal("success");
      expect(response.body.payload).to.have.property("_id");

      const updatedPet = await petModel.findById(pet._id);
      const updatedUser = await userModel.findById(user._id);

      expect(updatedPet.adopted).to.equal(true);
      expect(updatedPet.owner.toString()).to.equal(
        user._id.toString()
      );

      expect(
        updatedUser.pets.some(
          petId => petId.toString() === pet._id.toString()
        )
      ).to.equal(true);
    });

    it("should return 400 when the user ID is invalid", async () => {
      const response = await requester.post(
        `/api/adoptions/invalid-user/${pet._id}`
      );

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
    });

    it("should return 400 when the pet ID is invalid", async () => {
      const response = await requester.post(
        `/api/adoptions/${user._id}/invalid-pet`
      );

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
    });

    it("should return 404 when the galactic citizen does not exist", async () => {
      const fakeUserId = new mongoose.Types.ObjectId();

      const response = await requester.post(
        `/api/adoptions/${fakeUserId}/${pet._id}`
      );

      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal("error");
    });

    it("should return 404 when the galactic creature does not exist", async () => {
      const fakePetId = new mongoose.Types.ObjectId();

      const response = await requester.post(
        `/api/adoptions/${user._id}/${fakePetId}`
      );

      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal("error");
    });

    it("should return 400 when the creature is already adopted", async () => {
      pet.adopted = true;
      pet.owner = user._id;
      await pet.save();

      const response = await requester.post(
        `/api/adoptions/${user._id}/${pet._id}`
      );

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
    });

    it("should return 400 when an adoption record already exists", async () => {
      await adoptionModel.create({
        owner: user._id,
        pet: pet._id
      });

      const response = await requester.post(
        `/api/adoptions/${user._id}/${pet._id}`
      );

      expect(response.status).to.equal(400);
      expect(response.body.status).to.equal("error");
    });
  });
});