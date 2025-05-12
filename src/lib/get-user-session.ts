'use server'

import { currentUser } from '@clerk/nextjs/server'

import prisma from './db'

export type UserSession = NonNullable<Awaited<ReturnType<typeof getUserSession>>>

export const getUserSession = async () => {
  const user = await currentUser()

  if (!user) {
    return null
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
    select: {
      id: true,
      email: true,
      imageUrl: true,
      name: true,
      organization: {
        select: {
          id: true,
        },
      },
      roles: {
        select: {
          name: true,
          permissions: true,
        },
      },
    },
  })

  if (!dbUser) {
    return null
  }

  return {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    imageUrl: dbUser.imageUrl,
    roles: dbUser.roles,
    organizationId: dbUser.organization?.id,
    isScanner: dbUser.roles.some((role) => role.name === 'Scanner'),
    isAdmin: dbUser.roles.some((role) => role.name === 'Admin'),
    isSystemAdmin: dbUser.roles.some((role) => role.name === 'SystemAdmin'),
  }
}
