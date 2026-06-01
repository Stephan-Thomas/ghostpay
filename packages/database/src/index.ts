// Database package exports
export { PrismaClient } from './generated';
export type {
  Prisma,
  User,
  Session,
  MasterWallet,
  DisposableWallet,
  WalletAlias,
  SalaryCycle,
  Transaction,
  AuditLog,
  Notification,
  ConsolidationJob,
  SystemConfig,
} from './generated';

import { PrismaClient } from './generated';

// Singleton pattern for PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper function to disconnect Prisma client
export async function disconnectDb(): Promise<void> {
  await prisma.$disconnect();
}

// Helper function to connect to database
export async function connectDb(): Promise<void> {
  await prisma.$connect();
}