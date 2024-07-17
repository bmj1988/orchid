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
    "public" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "hashedPassword", "id", "img", "name", "preferences", "username") SELECT "email", "hashedPassword", "id", "img", "name", "preferences", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
