/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quote" ADD COLUMN "caption" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access" TEXT NOT NULL DEFAULT 'public',
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "color" TEXT DEFAULT '#F06F3B',
    CONSTRAINT "Wall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wall" ("access", "color", "id", "name", "userId") SELECT "access", "color", "id", "name", "userId" FROM "Wall";
DROP TABLE "Wall";
ALTER TABLE "new_Wall" RENAME TO "Wall";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
