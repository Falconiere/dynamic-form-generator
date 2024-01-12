import { PrismaClient } from '@prisma/client'

declare global {
  var GlobalPrismaClient: PrismaClient | undefined;
}

const getPrismaClient = (): PrismaClient => {
  if(globalThis.GlobalPrismaClient){
    return globalThis.GlobalPrismaClient
  }
  globalThis.GlobalPrismaClient = new PrismaClient()
  return global.GlobalPrismaClient as PrismaClient
}
export { getPrismaClient }