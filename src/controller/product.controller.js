import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respone.js";
import { ValidateData } from "../service/validate.js";
import Models from "../model/index.js";
import mongoose from "mongoose";
import UploadImageToCloud from "../config/cloudinary.js";
export default class ProductController {
  static async getAll(req, res) {
    try {
      const products = await Models.Product.find();
      if (!products) {
        return SendError404(res, EMessage.NotFound + "category");
      }
      return SendSuccess(res, SMessage.GetAll, products);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getOne(req, res) {
    try {
      const product_id = req.params.product_id;
      if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return SendError404(res, EMessage.NotFound + " product_id");
      }
      const product = await Models.Product.findById(product_id);
      return SendSuccess(res, SMessage.GetOne, product);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const { category_id, name, detail, price } = req.body;
      const validate = ValidateData({ category_id, name, detail, price });
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError404(res, EMessage.NotFound + " category_id");
      }
      const image = req.files.image;
      if (!image) {
        return SendError400(res, "image is required!");
      }
      let _images = [];
      for (let i = 0; i < image.length; i++) {
        const image_url = await UploadImageToCloud(
          image[i].data,
          image[i].name
        );
        _images.push(image_url);
      }

      if (!_images) {
        return SendError404(res, "Faild Upload Image");
      }
      const product = await Models.Product.create({
        name,
        category_id,
        detail,
        price,
        image: _images,
      });
      return SendCreate(res, SMessage.Create, product);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateProduct(req, res) {
    try {
      const product_id = req.params.product_id;
      if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return SendError404(res, EMessage.NotFound + " Product_id");
      }
      const { name, detail, price } = req.body;
      const validate = ValidateData({ name, detail, price });
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const image = req.files.image;

      const product = await Models.Product.findById(product_id);
      const image_url = await UploadImageToCloud(
        image.data,
        image.name,
        product.image
      );
      const data = await Models.Product.findByIdAndUpdate(
        product_id,
        {
          name,
          detail,
          price,
          image: image_url,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteProduct(req, res) {
    try {
      const product_id = req.params.product_id;
      if (!mongoose.Types.ObjectId.isValid(product_id)) {
        return SendError404(res, EMessage.NotFound + " product_id");
      }
      const product = await Models.Product.findByIdAndDelete(product_id);
      return SendSuccess(res, SMessage.Delete, product);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
