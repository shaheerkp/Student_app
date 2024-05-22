-- CreateTable
CREATE TABLE "Student" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "totalMark" DOUBLE PRECISION NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("Id")
);
