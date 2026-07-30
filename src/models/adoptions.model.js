import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pets",
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const adoptionModel = mongoose.model("adoptions", adoptionSchema);

export default adoptionModel;