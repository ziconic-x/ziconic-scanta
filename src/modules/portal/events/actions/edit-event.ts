'use server'

import { addDays } from 'date-fns'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { eventIdSchema, eventSchema } from '../schemas/organization-schema'

export const editEvent = authActionClient
  .schema(eventIdSchema.and(eventSchema))
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { id, name, description, address, startDate } }) => {
    try {
      if (startDate < new Date()) {
        throw new Error('Start date cannot be in the past')
      }

      await prisma.$transaction(async (tx) => {
        const event = await prisma.event.update({
          where: { id },
          data: {
            name,
            description,
            address,
            startDate,
          },
        })

        await tx.qrCode.updateMany({
          where: { eventId: id },
          data: {
            expiresAt: addDays(startDate, 1),
          },
        })

        revalidatePath('/events')
        revalidatePath(`/organizations/${event.organizationId}`)
        return event
      })
    } catch (error) {
      console.error('Failed to update event:', error)
      throw error
    }
  })
