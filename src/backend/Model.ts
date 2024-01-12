import { getPrismaClient } from "./prisma";

class Model{
  protected readonly client = getPrismaClient()
}

export { Model }