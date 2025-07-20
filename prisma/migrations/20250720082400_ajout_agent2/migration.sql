-- CreateEnum
CREATE TYPE "Fonction" AS ENUM ('SSIAP1', 'SSIAP2', 'SSIAP3');

-- CreateEnum
CREATE TYPE "Statut" AS ENUM ('EN_SERVICE', 'FIN_DE_SERVICE');

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "fonction" "Fonction" NOT NULL,
    "statut" "Statut" NOT NULL DEFAULT 'FIN_DE_SERVICE',
    "priseService" TIMESTAMP(3),
    "finService" TIMESTAMP(3),

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);
