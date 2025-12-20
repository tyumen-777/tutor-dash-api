-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR,
    "lastName" VARCHAR,
    "age" INTEGER,
    "email" VARCHAR,
    "phone" VARCHAR,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" VARCHAR,

    CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR,
    "lastName" VARCHAR,
    "email" VARCHAR,
    "phone" VARCHAR,

    CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_a56c051c91dbe1068ad683f536e" ON "student"("email");

