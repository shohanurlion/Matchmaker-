/*
  Warnings:

  - You are about to drop the `normalUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "normalUser" DROP CONSTRAINT "normalUser_email_fkey";

-- DropTable
DROP TABLE "normalUser";

-- CreateTable
CREATE TABLE "normaluser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "description" TEXT,
    "profilePhoto" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "normaluser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "normaluser_email_key" ON "normaluser"("email");

-- AddForeignKey
ALTER TABLE "normaluser" ADD CONSTRAINT "normaluser_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
