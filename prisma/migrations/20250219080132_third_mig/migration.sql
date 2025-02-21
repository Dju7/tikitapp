-- AlterTable
ALTER TABLE "Consignes" ALTER COLUMN "fin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HorsService" ADD COLUMN     "magasin" TEXT NOT NULL DEFAULT 'magasin 1';

-- CreateTable
CREATE TABLE "Anomalies" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "magasin" TEXT NOT NULL DEFAULT 'magasin 1',
    "equipement" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "defauts" TEXT NOT NULL,
    "gmao" INTEGER NOT NULL,

    CONSTRAINT "Anomalies_pkey" PRIMARY KEY ("id")
);
