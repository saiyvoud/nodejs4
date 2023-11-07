import jwt from "jsonwebtoken";
import cryptoJS from "crypto-js";
import {
  JWT_REFRESH_TIME_OUT,
  JWT_TIME_OUT,
  SCREATE_KEY,
} from "../config/globalkey.js";
import Models from "../model/index.js";

export const VerifyToken = async (token) => {
  return new Promise(async (resovle, reject) => {
    try {
      jwt.verify(token, SCREATE_KEY.toString(), async function (err, result) {
        if (err) reject(`err${err}`);

        const decriptToken = await DeCrypt(result.id);

        if (!decriptToken) {
          reject("Error Decript");
        }
        let decript = decriptToken.replace(/"/g, "");
        const user = await Models.User.findById({ _id: decript });
        resovle(user);
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const DeCrypts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = cryptoJS.AES.decrypt(data, SCREATE_KEY).toString();
     // let decriptPass = encrypt.toString(cryptoJS.enc.Utf8);
      resovle(encrypt);
    } catch (error) {
      reject(error);
    }
  });
};
export const DeCrypt = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = cryptoJS.AES.decrypt(data, SCREATE_KEY);
      let decriptPass = encrypt.toString(cryptoJS.enc.Utf8);
      resovle(decriptPass);
    } catch (error) {
      reject(error);
    }
  });
};
export const EnCrypts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const encrypt = cryptoJS.AES.encrypt(data, SCREATE_KEY).toString();
      resovle(encrypt);
    } catch (error) {
      reject(error);
    }
  });
};
export const jwts = async (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      const payload = {
        id: data._id,
        type: data.type,
      };
      var encryptRefresh = await EnCrypts(payload.id);
      const payload_refress = {
        id: encryptRefresh,
        type: data.type,
      };

      const jwtData = {
        expiresIn: parseInt(JWT_TIME_OUT),
      };
      const jwtDataRefresh = {
        expiresIn: parseInt(JWT_REFRESH_TIME_OUT),
      };
      //Generated JWT token with Payload and secret.
      const token = jwt.sign(payload, SCREATE_KEY, jwtData);
      const refreshToken = jwt.sign(
        payload_refress,
        SCREATE_KEY,
        jwtDataRefresh
      );

      resovle({ token, refreshToken });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const GenerateToken = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      let encryptRole = cryptoJS.AES.encrypt(
        "CUSTOMER",
        SCREATE_KEY
      ).toString();

      let encryptId = await EnCrypts(JSON.stringify(data));
      console.log(encryptId);
      const payload = {
        id: encryptId,
        role: encryptRole,
      };

      let encryptRefresh = await EnCrypts(payload.id);
      const payload_refresh = {
        id: encryptRefresh,
        role: encryptRole,
      };
      const jwt_timeout = {
        expiresIn: parseInt(JWT_TIME_OUT),
      };
      const jwt_refresh_timeout = {
        expiresIn: parseInt(JWT_REFRESH_TIME_OUT),
      };
      const token = jwt.sign(payload, SCREATE_KEY, jwt_timeout);

      const refreshToken = jwt.sign(
        payload_refresh,
        SCREATE_KEY,
        jwt_refresh_timeout
      );

      resovle({ token, refreshToken });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
