/*
  Warnings:

  - You are about to drop the column `blockchainHash` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `coverUrl` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_companyId_fkey";

-- DropIndex
DROP INDEX "products_blockchainHash_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "blockchainHash",
DROP COLUMN "companyId",
DROP COLUMN "coverUrl",
DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "product_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "product_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_types" ADD CONSTRAINT "product_types_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "product_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
