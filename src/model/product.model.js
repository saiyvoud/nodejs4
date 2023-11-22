import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    category_id: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "category",
    },
    name: {
      type: String,
      require: true,
    },
    detail: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);
export default Product;
