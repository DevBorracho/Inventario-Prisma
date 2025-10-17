import { PrismaClient } from "@prisma/client";
import { request, response } from "express";

const prisma = new PrismaClient();

export const getAllProducts = async (req = request, res = response) => {
  try {
    const userId = req.user.id;
    const products = await prisma.producto.findMany({
      where: { userId: userId },
    });
    if (!products) {
      return res.status(404).json({ message: "No hay productos" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los productos" });
  }
};
export const getProduct = async (req = request, res = response) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const product = await prisma.producto.findUnique({
      where: { userId: userId, id: id },
    });
    if (!product) {
      return res.status(404).json({ message: "el producto no existe" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req = request, res = response) => {
  const userId = req.user.id;
  const { nombre, precio, stock, unidadMedida } = req.body;
  try {
    unidadMedida.toUpperCase();
    if (!nombre || !precio || !stock || !unidadMedida) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    if (stock < 0) {
      return res.status(400).json({ message: "El stock debe ser mayor a 0" });
    }
    if (precio < 0) {
      return res.status(400).json({ message: "El precio debe ser mayor a 0" });
    }
    if (
      unidadMedida !== "UND" &&
      unidadMedida !== "KG" &&
      unidadMedida !== "LB"
    ) {
      return res
        .status(400)
        .json({ message: "La unidad de medida debe ser UND, KG o LB" });
    }
    const producto = await prisma.producto.create({
      data: {
        nombre,
        precio,
        stock,
        unidadMedida,
        userId,
      },
    });
    if (!producto) {
      return res.status(500).json({ message: "error al crear el producto" });
    }
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};
export const updateProduct = async (req = request, res = response) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { nombre, precio, stock, unidadMedida } = req.body;
  try {
    const product = await prisma.producto.findUnique({
      where: { id: id },
    });
    if (!product) {
      return res.status(404).json({ message: "el producto no existe" });
    }
    const updateProduct = await prisma.producto.updateManyAndReturn({
      where: { id, userId },
      data: { nombre, precio, stock, unidadMedida },
    });
    if (!updateProduct) {
      return res.status(404).json({ message: "el producto no existe" });
    }
    return res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req = request, res = response) => {
  const userId = req.user.id;
  const id = req.params.id;
  try {
    const product = await prisma.producto.findUnique({
      where: { id: id },
    });
    if (!product) {
      return res.status(404).json({ message: "el producto no existe" });
    }
    const deleteProduct = await prisma.producto.delete({
      where: { id, userId },
    });
    if (!deleteProduct) {
      return res.status(404).json({ message: "el producto no existe" });
    }
    return res.status(200).json(deleteProduct);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
