/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- CreateTable
CREATE TABLE "Consignes" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "agent" TEXT NOT NULL,
    "equipe" TEXT NOT NULL DEFAULT 'jour',
    "contenu" TEXT NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consignes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorsService" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "agent" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "motif" TEXT NOT NULL,

    CONSTRAINT "HorsService_pkey" PRIMARY KEY ("id")
);
