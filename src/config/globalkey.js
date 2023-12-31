import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const URL_DATABASE = process.env.URL_DATABASE;
const SCREATE_KEY = process.env.SCREATE_KEY;
const JWT_TIME_OUT = process.env.JWT_TIME_OUT;
const JWT_REFRESH_TIME_OUT = process.env.JWT_REFRESH_TIME_OUT;
const CLOUDNAME_CLOUDINARY = process.env.CLOUDNAME_CLOUDINARY;
const API_KEY_CLOUDINARY = process.env.API_KEY_CLOUDINARY;
const API_SECRET_CLOUDINAY = process.env.API_SECRET_CLOUDINAY;
export {
  PORT,
  URL_DATABASE,
  SCREATE_KEY,
  JWT_TIME_OUT,
  JWT_REFRESH_TIME_OUT,
  CLOUDNAME_CLOUDINARY,
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINAY,
};
