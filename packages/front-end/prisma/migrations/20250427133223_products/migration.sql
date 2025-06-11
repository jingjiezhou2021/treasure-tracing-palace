-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('MANUFACTURING', 'DISTRIBUTING', 'FOR_SALE', 'SOLD');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coverUrl" TEXT,
    "serialNumber" TEXT NOT NULL,
    "blockchainHash" TEXT,
    "manufactureDate" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "creatorId" UUID NOT NULL,
    "currentOwnerId" UUID NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'MANUFACTURING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_serialNumber_key" ON "products"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "products_blockchainHash_key" ON "products"("blockchainHash");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_currentOwnerId_fkey" FOREIGN KEY ("currentOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
