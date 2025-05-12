'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { organizationIdSchema, organizationSchema } from '../schemas/organization-schema'

export const editOrganization = authActionClient
  .schema(organizationIdSchema.and(organizationSchema))
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { organizationId, name, description } }) => {
    try {
      const organization = await prisma.organization.update({
        where: { id: organizationId },
        data: {
          name,
          description,
        },
      })

      revalidatePath('/organizations')

      return organization
    } catch (error) {
      console.error('Failed to update organization:', error)
      throw error
    }
  })
