/*
  Warnings:

  - You are about to drop the column `description` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;
