import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  profile: {
    type: String,
    default: "",
  },
},{timestamps: true});

const User = mongoose.model("user", userSchema);
export default User;
