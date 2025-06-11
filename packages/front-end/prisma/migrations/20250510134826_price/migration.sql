-- AlterTable
ALTER TABLE "product_types" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 999999;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 999999;
