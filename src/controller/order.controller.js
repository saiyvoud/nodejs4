import mongoose from "mongoose";
import { EMessage, SMessage, StatusOrder } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respone.js";
import { ValidateData } from "../service/validate.js";
import Models from "../model/index.js";
import UploadImageToCloud from "../config/cloudinary.js";
export default class OrderController {
  static async getOne(req, res) {
    try {
      const order_id = req.params.order_id;
      if (!mongoose.Types.ObjectId.isValid(order_id)) {
        return SendError404(res, EMessage.NotFound + "Order");
      }
      const order = await Models.Order.findById(order_id);
      return SendSuccess(res, SMessage.GetOne, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByStatus(req, res) {
    try {
      const { user_id, status } = req.query;
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + "User");
      }
      const checkStatus = Object.assign(StatusOrder);
      if (!checkStatus.include(status)) {
        return SendError400(res, "not match status");
      }
      const order = await Models.Order.find({
        user_id,
        status,
      });
      return SendSuccess(res, SMessage.GetAll, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getByUser(req, res) {
    try {
      const user_id = req.params.user_id;
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + "User");
      }
      const order = await Models.Order.find({ user_id });
      return SendSuccess(res, SMessage.GetAll, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getAll(req, res) {
    try {
      const order = await Models.Order.find();
      return SendSuccess(res, SMessage.GetAll, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const {
        user_id,
        products,
        address,
        phoneNumber,
        customerName,
        totalPrice,
      } = req.body;
      const validate = ValidateData({
        user_id,
        products,
        address,
        phoneNumber,
        customerName,
        totalPrice,
      });
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + "user");
      }
      const bill = req.files.bill;
      const bill_url = await UploadImageToCloud(bill.data, bill.name);
      if (!bill_url) {
        return SendError404(res, "Faild Upload Image");
      }
      const order = await Models.Order.create({
        user_id,
        address: {
          village: address.village,
          district: address.district,
          province: address.province,
        },
        products: [
          {
            _id: products._id,
            category_id: products.category_id,
            name: products.name,
            detail: products.detail,
            amount: products.amount,
            price: products.price,
            image: products.image,
          },
        ],
        customerName,
        phoneNumber,
        bill: bill_url,
      });
      if (!order) {
        return SendError404(res, "Faild Create Order");
      }
      return SendCreate(res, SMessage.Create, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateStatus(req, res) {
    try {
      const { order_id, status } = req.body;
      const validate = ValidateData({ order_id, status });
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const checkStatus = Object.assign(StatusOrder);
      if (!checkStatus.include(status)) {
        return SendError400(res, "not match status");
      }
      const order = await Models.Order.findByIdAndUpdate(
        order_id,
        {
          status,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteOrder(req, res) {
    try {
      const { order_id } = req.params;

      const order = await Models.Order.findByIdAndDelete(
        order_id,

        { new: true }
      );
      return SendSuccess(res, SMessage.Delete, order);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
