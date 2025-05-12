'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { organizationIdSchema } from '../schemas/organization-schema'

export const deleteOrganization = authActionClient
  .schema(organizationIdSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { organizationId } }) => {
    try {
      await prisma.organization.delete({
        where: {
          id: organizationId,
        },
      })
      revalidatePath('/organizations')
    } catch (error) {
      console.error('Failed to delete organization:', error)
      throw error
    }
  })
