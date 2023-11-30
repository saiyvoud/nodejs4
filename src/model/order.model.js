import mongoose from "mongoose";
import { StatusOrder } from "../service/message.js";

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "user",
    },
    products: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
        },
        category_id: {
          type: mongoose.Types.ObjectId,
          ref: "category",
          require: true,
        },
        name: {
          type: String,
          require: true,
        },
        detail: {
          type: String,
          require: true,
        },
        amount: {
          type: Number,
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
    ],
    address: {
      village: {
        type: String,
      },
      district: {
        type: String,
      },
      province: {
        type: String,
      },
    },
    customerName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusOrder),
      default: StatusOrder.await,
    },
    bill: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
