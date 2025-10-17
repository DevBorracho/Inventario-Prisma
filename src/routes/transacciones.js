import { Router } from "express";
import {
  getAllTransacciones,
  createTransaccion,
  deleteTransaccion,
} from "../controllers/transacciones.js";
import VerifyToken from "../middlewares/verifyToken.js";
const router = Router();
router.post("/:id", VerifyToken, createTransaccion);
router.get("/", VerifyToken, getAllTransacciones);
router.delete("/:id", VerifyToken, deleteTransaccion);
export default router;
