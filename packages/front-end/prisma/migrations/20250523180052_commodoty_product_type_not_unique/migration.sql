/*
  Warnings:

  - A unique constraint covering the columns `[creatorId,productTypeId]` on the table `Commodoty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Commodoty_productTypeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Commodoty_creatorId_productTypeId_key" ON "Commodoty"("creatorId", "productTypeId");
