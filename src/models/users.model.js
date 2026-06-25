import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },

    last_name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    pets: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pets"
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model(usersCollection, userSchema);

export default userModel;