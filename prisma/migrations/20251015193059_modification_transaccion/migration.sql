/*
  Warnings:

  - You are about to drop the column `monto` on the `Transaccion` table. All the data in the column will be lost.
  - Added the required column `total` to the `Transaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaccion" DROP COLUMN "monto",
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "cantidad" SET DATA TYPE DOUBLE PRECISION;
