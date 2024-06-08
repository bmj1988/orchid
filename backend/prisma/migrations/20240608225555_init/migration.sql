-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "preferences" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Wall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "access" TEXT NOT NULL DEFAULT 'public',
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Wall_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "wallId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Quote_wallId_fkey" FOREIGN KEY ("wallId") REFERENCES "Wall" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
