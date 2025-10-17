/*
  Warnings:

  - Added the required column `userId` to the `Transaccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaccion" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
