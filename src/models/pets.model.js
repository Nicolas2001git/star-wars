import mongoose from "mongoose";

const petsCollection = "pets";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    specie: {
      type: String,
      required: true
    },

    birthDate: {
      type: Date,
      required: true
    },

    adopted: {
      type: Boolean,
      default: false
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const petModel = mongoose.model(petsCollection, petSchema);

export default petModel;