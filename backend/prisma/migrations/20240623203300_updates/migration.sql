/*
  Warnings:

  - You are about to drop the `_UserToWall` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_UserToWall_B_index";

-- DropIndex
DROP INDEX "_UserToWall_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserToWall";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Follows" (
    "followedById" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    PRIMARY KEY ("followingId", "followedById"),
    CONSTRAINT "Follows_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallId" INTEGER NOT NULL,
    CONSTRAINT "Group_wallId_fkey" FOREIGN KEY ("wallId") REFERENCES "Wall" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Quote_wallId_fkey" FOREIGN KEY ("wallId") REFERENCES "Wall" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Quote" ("author", "content", "id", "postedOn", "updatedOn", "wallId") SELECT "author", "content", "id", "postedOn", "updatedOn", "wallId" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE TABLE "new_Wall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access" TEXT NOT NULL DEFAULT 'public',
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Wall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wall" ("access", "id", "name", "userId") SELECT "access", "id", "name", "userId" FROM "Wall";
DROP TABLE "Wall";
ALTER TABLE "new_Wall" RENAME TO "Wall";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Group_wallId_key" ON "Group"("wallId");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");
