import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import CreateToken from "../utils/jwt.js";
import { request, response } from "express";
const prisma = new PrismaClient();
export const register = async (req = request, res = response) => {
  const { username, email, password } = req.body;
  const userExist = await prisma.user.findUnique({ where: { email: email } });
  if (userExist) return res.status(400).json({ msg: "El usuario ya existe" });
  const SALT = Number(process.env.SALT) || 8;
  const passwordHash = await bcryptjs.hash(password, SALT);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: passwordHash,
    },
  });
  if (!user) return res.status(500).json({ msg: "error al crear el usuario" });
  const token = await CreateToken({ id: user.id });
  res.cookie("token", token);
  return res.status(201).json({ user, token });
};
export const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user)
    return res
      .status(404)
      .json({ msg: "Usuario no encontrado, email incorrecto" });
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ msg: "Contraseña incorrecta" });
  const token = await CreateToken({ id: user.id });
  res.cookie("token", token);
  return res.status(200).json({ user, token });
};
export const logout = (req = request, res = response) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Sesion cerrada" });
};
