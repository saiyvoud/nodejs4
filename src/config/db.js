import mongoose from "mongoose";
import { URL_DATABASE } from "./globalKey.js";

const DB = mongoose
  .connect(URL_DATABASE)
  .then(() => {
    console.log(`Connected Database!`);
  })
  .catch(() => {
    console.log(`Faild Connected Database!`);
  });
export default DB;