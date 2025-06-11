/*
  Warnings:

  - You are about to drop the column `lockedPrice` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "lockedPrice";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "lockedPrice" BIGINT;
