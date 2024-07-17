/*
  Warnings:

  - You are about to drop the column `public` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "preferences" INTEGER,
    "bio" TEXT,
    "img" TEXT,
    "access" TEXT NOT NULL DEFAULT 'public'
);
INSERT INTO "new_User" ("bio", "email", "hashedPassword", "id", "img", "name", "preferences", "username") SELECT "bio", "email", "hashedPassword", "id", "img", "name", "preferences", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
