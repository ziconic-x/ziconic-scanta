'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { EventStatus } from '@/generated/prisma/client'

import { eventSchema } from '../schemas/organization-schema'

export const addEvent = authActionClient
  .schema(eventSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { organizationId, name, description, startDate, address } }) => {
    try {
      await prisma.event.create({
        data: {
          name,
          description,
          startDate,
          address,
          organizationId,
          status: EventStatus.UPCOMING,
        },
      })
      revalidatePath('/events')
      revalidatePath(`/organizations/${organizationId}`)
    } catch (error) {
      console.error('Failed to add event:', error)
      throw error
    }
  })
