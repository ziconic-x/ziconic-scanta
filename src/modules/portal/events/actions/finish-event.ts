'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { EventStatus } from '@/generated/prisma/client'

import { finishEventSchema } from '../schemas/organization-schema'

export const finishEvent = authActionClient
  .schema(finishEventSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { eventId, organizationId } }) => {
    try {
      await prisma.event.update({
        where: { id: eventId },
        data: {
          status: EventStatus.FINISHED,
        },
      })
      revalidatePath('/events')
      revalidatePath(`/organizations/${organizationId}`)
    } catch (error) {
      console.error('Failed to finish event:', error)
      throw error
    }
  })
