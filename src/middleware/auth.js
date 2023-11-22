import { EMessage } from "../service/message.js";
import {
  SendError401,
  SendError404,
  SendError500,
} from "../service/respone.js";
import { VerifyToken } from "../service/promise.js";
export const auth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return SendError401(res, EMessage.unauthorizaton);
    }
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      return SendError401(res, EMessage.unauthorizaton);
    }

    // const decode = await DeCrypts(token);
    // console.log(decode);
    const result = await VerifyToken(token);
    if (!result.id) {
      return SendError404(res, "Not Found");
    }
    req.user = result.id;
    next();
  } catch (error) {
    return SendError500(res, EMessage.FaildServer, error);
  }
};
