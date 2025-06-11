-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shippingExpressNumber" TEXT,
ADD COLUMN     "shippingOriginAddress" TEXT,
ADD COLUMN     "shippingOriginPersonName" TEXT,
ADD COLUMN     "shippingOriginPhoneNumber" TEXT;
