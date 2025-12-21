/*
  Warnings:

  - The `teacherId` column on the `student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[phone]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "teacherId",
ADD COLUMN     "teacherId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "teacher_phone_key" ON "teacher"("phone");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
