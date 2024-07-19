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
    "color" TEXT DEFAULT '#F06F3B',
    "caption" TEXT DEFAULT '',
    CONSTRAINT "Quote_wallId_fkey" FOREIGN KEY ("wallId") REFERENCES "Wall" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Quote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Quote" ("author", "caption", "color", "content", "id", "postedOn", "updatedOn", "userId", "wallId") SELECT "author", "caption", "color", "content", "id", "postedOn", "updatedOn", "userId", "wallId" FROM "Quote";
DROP TABLE "Quote";
ALTER TABLE "new_Quote" RENAME TO "Quote";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "preferences" INTEGER,
    "bio" TEXT DEFAULT '',
    "img" TEXT,
    "access" TEXT NOT NULL DEFAULT 'public'
);
INSERT INTO "new_User" ("access", "bio", "email", "hashedPassword", "id", "img", "name", "preferences", "username") SELECT "access", "bio", "email", "hashedPassword", "id", "img", "name", "preferences", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
