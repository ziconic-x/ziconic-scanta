'use server'

import { z } from 'zod'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

const checkEventStatusSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required').optional(),
})

export const checkEventStatus = authActionClient
  .schema(checkEventStatusSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { eventId } }) => {
    try {
      if (!eventId) {
        throw new Error('Event ID is required')
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: {
          id: true,
          status: true,
          startDate: true,
        },
      })

      if (!event) {
        throw new Error('Event not found')
      }

      if (event.status === 'FINISHED') {
        throw new Error('Event has already finished')
      }

      return event
    } catch (error) {
      console.error('Failed to check event status:', error)
      throw error
    }
  })
