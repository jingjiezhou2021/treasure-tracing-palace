-- CreateTable
CREATE TABLE "Commodoty" (
    "id" SERIAL NOT NULL,
    "productTypeId" INTEGER NOT NULL,
    "creatorId" UUID NOT NULL,
    "CommodotyPrice" BIGINT NOT NULL,

    CONSTRAINT "Commodoty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Commodoty_productTypeId_key" ON "Commodoty"("productTypeId");

-- AddForeignKey
ALTER TABLE "Commodoty" ADD CONSTRAINT "Commodoty_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "product_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commodoty" ADD CONSTRAINT "Commodoty_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
