-- CreateTable
CREATE TABLE "matchmakerpost" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "Photo" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "matchmakerId" TEXT NOT NULL,

    CONSTRAINT "matchmakerpost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "matchmakerpost_email_key" ON "matchmakerpost"("email");

-- AddForeignKey
ALTER TABLE "matchmakerpost" ADD CONSTRAINT "matchmakerpost_matchmakerId_fkey" FOREIGN KEY ("matchmakerId") REFERENCES "matchmaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
