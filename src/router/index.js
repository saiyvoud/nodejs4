import express from "express";
import CategoryController from "../controller/category.controller.js";
import UserController from "../controller/user.controller.js";
import ProductController from "../controller/product.controller.js";
import OrderController from "../controller/order.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/user/register",UserController.register);
router.post("/user/login",UserController.login);
router.get("/user/getOne/:user_id",auth,UserController.getOne);
router.put("/user/update",auth,UserController.updateProfile);
//-------------- category --------
router.post("/category/insert",auth,CategoryController.insert);
router.get("/category/getAll",auth,CategoryController.getAll);
router.get("/category/getOne/:category_id",auth,CategoryController.getOne);
router.put("/category/update/:category_id",auth,CategoryController.updateCategory);
router.delete("/category/delete/:category",auth,CategoryController.deleteCategory);
//------------- product ------------
router.post("/product/insert",auth,ProductController.insert);
router.get("/product/getAll",auth,ProductController.getAll);
router.get("/product/getOne/:product_id",auth,ProductController.getOne);
router.put("/product/update/:product",auth,ProductController.updateProduct);
router.delete("/product/delete/:product",auth,ProductController.deleteProduct);
//------------- order ------------
router.post("/order/insert",auth,OrderController.insert);
router.get("/order/getAll",auth,OrderController.getAll);
router.get("/order/:user_id",auth,OrderController.getByUser);
router.get("/order",auth,OrderController.getByStatus);
router.get("/order/getOne/:order_id",auth,OrderController.getOne);
router.put("/order/updateStatus",auth,OrderController.updateStatus);
router.delete("/order/delete/:order",auth,OrderController.deleteOrder);
export default router;