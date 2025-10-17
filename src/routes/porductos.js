import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productos.js";
import VerifyToken from "../middlewares/verifyToken.js";
const router = Router();
router.post("/", VerifyToken, createProduct);
router.get("/", VerifyToken, getAllProducts);
router.get("/:id", VerifyToken, getProduct);
router.put("/:id", VerifyToken, updateProduct);
router.delete("/:id", VerifyToken, deleteProduct);
export default router;
