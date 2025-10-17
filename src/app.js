import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/porductos.js";
import morgan from "morgan";
import transaccionRoutes from "./routes/transacciones.js";
const app = express();
//poner una barra de busqueda para los productos y las transaccion por nombre
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaccion", transaccionRoutes);
export default app;
