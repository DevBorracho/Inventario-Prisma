import { PrismaClient } from "@prisma/client";
import { request, response } from "express";

const prisma = new PrismaClient();

export const getAllTransacciones = async (req = request, res = response) => {
  try {
    const transacciones = await prisma.transaccion.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        createdAt: true,
        producto: {
          select: {
            id: true,
            nombre: true,
            precio: true,
          },
        },
        cantidad: true,
        total: true,
        precioUnitario: true,
        tipo: true,
      },
    });
    if (transacciones.length === 0) {
      return res.status(404).json({ message: "No hay transacciones" });
    }
    return res.status(200).json(transacciones);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener las transacciones" });
  }
};

export const createTransaccion = async (req = request, res = response) => {
  try {
    const transaccion = await prisma.transaccion.create({
      data: {
        userId: req.user.id,
        productoId: req.params.id,
        cantidad: Number(req.body.cantidad),
        precioUnitario: Number(req.body.precioUnitario),
        tipo: req.body.tipo,
      },
    });
    if (!transaccion) {
      return res
        .status(404)
        .json({ message: "No se pudo crear la transaccion" });
    }
    if (req.body.tipo === "ENTRADA") {
      await prisma.producto.update({
        where: { id: req.params.id },
        data: { stock: { increment: Number(req.body.cantidad) } },
      });
    }
    if (req.body.tipo === "SALIDA") {
      await prisma.producto.update({
        where: { id: req.params.id },
        data: { stock: { decrement: Number(req.body.cantidad) } },
      });
    }
    return res.status(201).json(transaccion);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la transaccion" });
  }
};
export const deleteTransaccion = async (req = request, res = response) => {
  try {
    const transaccion = await prisma.transaccion.delete({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!transaccion) {
      return res
        .status(404)
        .json({ message: "No se pudo eliminar la transaccion" });
    }
    return res.status(204).json({ msg: "Transaccion eliminada exitosamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar la transaccion" });
  }
};
