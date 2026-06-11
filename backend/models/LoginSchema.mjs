import mongoose from "mongoose";

const loginSchemma = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    }
  },
  {
    timestamps: true,
  },
);

const Logins = mongoose.model("Login", loginSchemma);

export default Logins;
