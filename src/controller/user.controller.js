import Models from "../model/index.js";
import crypto from "crypto-js";
import { SCREATE_KEY } from "../config/globalkey.js";
import { ValidateData } from "../service/validate.js";
import {
  SendCreate,
  SendError400,
  SendError404,
  SendError500,
  SendSuccess,
} from "../service/respone.js";
import { EMessage, SMessage } from "../service/message.js";
import { GenerateToken } from "../service/promise.js";
import mongoose from "mongoose";
export default class UserController {
  static async getOne(req, res) {
    try {
      const user_id = req.params.user_id;
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return SendError404(res, EMessage.NotFound + " user_id");
      }
      const user = await Models.User.findById({ _id: user_id });
      return SendSuccess(res, SMessage.GetOne, user);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const validate = ValidateData({
        email,
        password,
      });
      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }
      const checkEmail = await Models.User.findOne({ email });
      if (!checkEmail) {
        return SendError404(res, EMessage.NotFound + " Email");
      }
      const decrypt = crypto.AES.decrypt(checkEmail.password, SCREATE_KEY);

      let decryptPassword = decrypt.toString(crypto.enc.Utf8);

      if (password !== decryptPassword) {
        return SendError404(res, EMessage.FalidPassword);
      }
      const jwt = await GenerateToken(checkEmail._id);
      const user = await Models.User.findById(checkEmail._id).select(
        "-password"
      );

      const data = Object.assign(
        JSON.parse(JSON.stringify(user)),
        JSON.parse(JSON.stringify(jwt))
      );
      return SendSuccess(res, SMessage.Logined, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
  static async register(req, res) {
    try {
      const { username, email, phone, password, profile } = req.body;
      const validate = ValidateData({
        username,
        email,
        phone,
        password,
        profile,
      });

      if (validate.length > 0) {
        return SendError400(res, EMessage.PleaseInput + validate.join(","));
      }

      const genPassword = crypto.AES.encrypt(password, SCREATE_KEY);

      const user = await Models.User.create({
        username,
        email,
        phone,
        password: genPassword,
        profile,
      });
      if (!user) {
        return SendError400(res, EMessage.Faild, user);
      }
      const jwt = await GenerateToken(user);
      const newData = await Models.User.findById(user._id).select("-password");

      const data = Object.assign(
        JSON.parse(JSON.stringify(newData)),
        JSON.parse(JSON.stringify(jwt))
      );
      return SendCreate(res, SMessage.Create, data);
    } catch (error) {
      console.log(error);
      return SendError500(res, EMessage.FaildServer, error);
    }
  }
}
