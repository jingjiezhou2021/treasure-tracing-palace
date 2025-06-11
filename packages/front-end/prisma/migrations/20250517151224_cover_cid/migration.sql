/*
  Warnings:

  - You are about to drop the column `coverUrl` on the `product_types` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_types" DROP COLUMN "coverUrl",
ADD COLUMN     "coverCid" TEXT;
