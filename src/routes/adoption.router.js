import { Router } from "express";
import mongoose from "mongoose";

import adoptionModel from "../models/adoptions.model.js";
import userModel from "../models/users.model.js";
import petModel from "../models/pets.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const galacticAdoptions = await adoptionModel
      .find()
      .populate("owner")
      .populate("pet");

    res.status(200).json({
      status: "success",
      message: "Galactic adoptions retrieved successfully.",
      payload: galacticAdoptions
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "The Galactic Archives could not retrieve the adoptions.",
      error: error.message
    });
  }
});

router.get("/:aid", async (req, res) => {
  try {
    const { aid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(aid)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid galactic adoption ID."
      });
    }

    const galacticAdoption = await adoptionModel
      .findById(aid)
      .populate("owner")
      .populate("pet");

    if (!galacticAdoption) {
      return res.status(404).json({
        status: "error",
        message: "The requested adoption was not found in the Galactic Archives."
      });
    }

    res.status(200).json({
      status: "success",
      message: "Galactic adoption retrieved successfully.",
      payload: galacticAdoption
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "The Galactic Archives could not retrieve this adoption.",
      error: error.message
    });
  }
});

router.post("/:uid/:pid", async (req, res) => {
  try {
    const { uid, pid } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(uid) ||
      !mongoose.Types.ObjectId.isValid(pid)
    ) {
      return res.status(400).json({
        status: "error",
        message: "Invalid galactic citizen or creature ID."
      });
    }

    const galacticCitizen = await userModel.findById(uid);
    const galacticCreature = await petModel.findById(pid);

    if (!galacticCitizen) {
      return res.status(404).json({
        status: "error",
        message: "The galactic citizen was not found."
      });
    }

    if (!galacticCreature) {
      return res.status(404).json({
        status: "error",
        message: "The galactic creature was not found."
      });
    }

    if (galacticCreature.adopted) {
      return res.status(400).json({
        status: "error",
        message: "This galactic creature has already joined another crew."
      });
    }

    const existingAdoption = await adoptionModel.findOne({
      pet: galacticCreature._id
    });

    if (existingAdoption) {
      return res.status(400).json({
        status: "error",
        message: "This creature already has an adoption record in the Galactic Archives."
      });
    }

    const newGalacticAdoption = await adoptionModel.create({
      owner: galacticCitizen._id,
      pet: galacticCreature._id
    });

    galacticCreature.adopted = true;
    galacticCreature.owner = galacticCitizen._id;

    await galacticCreature.save();

    const creatureAlreadyInCrew = galacticCitizen.pets.some(
      creatureId =>
        creatureId.toString() === galacticCreature._id.toString()
    );

    if (!creatureAlreadyInCrew) {
      galacticCitizen.pets.push(galacticCreature._id);
      await galacticCitizen.save();
    }

    const completedGalacticAdoption = await adoptionModel
      .findById(newGalacticAdoption._id)
      .populate("owner")
      .populate("pet");

    res.status(201).json({
      status: "success",
      message: "The galactic creature has successfully joined its new crew.",
      payload: completedGalacticAdoption
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "The adoption mission failed. The Force was not with us.",
      error: error.message
    });
  }
});

export default router;