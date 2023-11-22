import express from "express";
import UserController from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/user/register",UserController.register);
router.post("/user/login",UserController.login);
router.get("/user/getOne/:user_id",auth,UserController.getOne);
router.put("/user/update",auth,UserController.updateProfile);
export default router;