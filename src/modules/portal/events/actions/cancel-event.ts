'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { cancelEventSchema } from '../schemas/organization-schema'

export const cancelEvent = authActionClient
  .schema(cancelEventSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { eventId, organizationId } }) => {
    try {
      const event = await prisma.event.findUniqueOrThrow({
        where: { id: eventId },
      })

      if (event.status === 'FINISHED') {
        throw new Error('Event is finished')
      }

      await prisma.event.delete({
        where: { id: eventId },
      })
      revalidatePath('/events')
      revalidatePath(`/organizations/${organizationId}`)
    } catch (error) {
      console.error('Failed to cancel event:', error)
      throw error
    }
  })
