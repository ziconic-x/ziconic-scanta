import { PrismaClient } from '@/generated/prisma/client'

const prisma = new PrismaClient()

export async function main() {
  await prisma.role.create({
    data: {
      name: 'SystemAdmin',
      permissions: {
        create: [{ name: 'access:edge-operations' }],
      },
    },
  })

  await prisma.role.create({
    data: {
      name: 'Scanner',
      permissions: {
        create: [{ name: 'access:scanner' }],
      },
    },
  })

  await prisma.role.create({
    data: {
      name: 'Admin',
      permissions: {
        create: [{ name: 'access:organization-portal' }],
      },
    },
  })
}

main()
