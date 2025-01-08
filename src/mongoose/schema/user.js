import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    lastName: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      unique: true,
      validate: {
        validator: (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
      },
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.String,
      unique: true,
      lowercase: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
