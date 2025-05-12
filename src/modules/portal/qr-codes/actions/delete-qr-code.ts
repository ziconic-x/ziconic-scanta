'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

const deleteQrCodeSchema = z.object({
  id: z.string(),
})

export const deleteQrCode = authActionClient
  .schema(deleteQrCodeSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { id } }) => {
    try {
      await prisma.qrCode.delete({
        where: { id },
      })

      revalidatePath('/events/[eventId]', 'page')
    } catch (error) {
      console.error('Failed to delete QR code:', error)
      throw error
    }
  })
