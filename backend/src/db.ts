import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  throw new Error("Please provide a DATABASE_URL in the environment variables");
}
const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  omit: {
    user:{
      password: true
    }
  },
  transactionOptions: {
    maxWait: 10 * 60 * 1000,
    timeout: 10 * 60 * 1000,
  }
});

const globalForPrisma = globalThis as unknown as { db: typeof client };
export const db = globalForPrisma.db || client;

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;

export * from "@prisma/client";



export const connectToDatabase = async () => {
  await db.$connect();
};