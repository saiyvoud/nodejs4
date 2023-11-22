import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
},{timestamps: true});

const Category = mongoose.model("category", categorySchema);
export default Category;
