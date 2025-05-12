'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { Prisma } from '@/generated/prisma/client'

import { organizationSchema } from '../schemas/organization-schema'

export const addOrganization = authActionClient
  .schema(organizationSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { name, description } }) => {
    try {
      await prisma.organization.create({
        data: {
          name,
          description,
        },
      })
      return revalidatePath('/organizations')
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Organization name already exists')
        }
      }

      console.error('Failed to add organization:', error)
      throw error
    }
  })
