import mongoose from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: isEmail,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new or changed
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const auth = await bcrypt.compare(enteredPassword, this.password);
  return auth;
};

export default mongoose.model("User", UserSchema);
