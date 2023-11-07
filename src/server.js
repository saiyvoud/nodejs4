
import express from "express";
import { PORT } from "./config/globalkey.js";
import  "./config/db.js";
import router from "./router/index.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express()

app.use(cors());

app.use(bodyParser.json({ extended: true, limit: "500mb", parameterLimit: 500 }));
app.use(
  bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 500 })
);
app.use("/apiv1",router)
app.listen(PORT,()=>{
    console.log(`Sever is running on http://localhost:${PORT}`);
})