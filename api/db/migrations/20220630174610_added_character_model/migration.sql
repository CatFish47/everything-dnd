-- CreateTable
CREATE TABLE "UserExample" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "isPlayer" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "wis" INTEGER NOT NULL,
    "cha" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "ac" INTEGER NOT NULL,
    "lvl" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserExample_email_key" ON "UserExample"("email");
