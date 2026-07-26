// lib/prisma.js
// Prisma client ko globally cache karte hain taake dev mode mein
// baar baar naya connection na bane (hot reload ki wajah se)

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
