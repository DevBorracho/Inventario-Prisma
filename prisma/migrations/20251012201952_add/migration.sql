-- CreateEnum
CREATE TYPE "TipoTransaccion" AS ENUM ('ENTRADA', 'SALIDA');

-- CreateTable
CREATE TABLE "Transaccion" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productoId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "tipo" "TipoTransaccion" NOT NULL DEFAULT 'ENTRADA',

    CONSTRAINT "Transaccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
