import mongoose from "mongoose";
import UploadImageToCloud from "../config/cloudinary.js";
import Models from "../model/index.js";
import { EMessage, SMessage } from "../service/message.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respone.js";


export default class CategoryController {
  static async getAll(req, res) {
    try {
      const categories = await Models.Category.find();
      if (!categories) {
        return SendError404(res, EMessage.NotFound + "category");
      }
      return SendSuccess(res, SMessage.GetAll, categories);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async getOne(req, res) {
    try {
      const category_id = req.params.category_id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError404(res, EMessage.NotFound + " category_id");
      }
      const category = await Models.Category.findById(category_id);
      return SendSuccess(res, SMessage.GetOne, category);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async insert(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return SendError400(res, EMessage.PleaseInput, "name");
      }
      // const image = req.files.image;
      // const image_url = await UploadImageToCloud(image.data, image.name);
      // if (!image_url) {
      //   return SendError404(res, "Faild Upload Image");
      // }
      const category = await Models.Category.create({
        name,
        // image: image_url,
      });
      return SendCreate(res, SMessage.Create, category);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async updateCategory(req, res) {
    try {
      const category_id = req.params.category_id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError404(res, EMessage.NotFound + " category_id");
      }
      const {name} = req.body;
      if (!name) {
        return SendError400(res, EMessage.PleaseInput, "name");
      }
      // const image = req.files.image;

      //const category = await Models.Category.findById(category_id);
      // const image_url = await UploadImageToCloud(
      //   image.data,
      //   image.name,
      //   category.image
      // );
      const data = await Models.Category.findByIdAndUpdate(
        category_id,
        {
          name,
          // image: image_url,
        },
        { new: true }
      );
      return SendSuccess(res, SMessage.Update, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const category_id = req.params.category_id;
      if (!mongoose.Types.ObjectId.isValid(category_id)) {
        return SendError404(res, EMessage.NotFound + " category_id");
      }
      const category = await Models.Category.findByIdAndDelete(category_id);
      return SendSuccess(res, SMessage.Delete, category);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
