'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { qrCodeEditSchema, qrCodeIdSchema } from '../schemas/qr-code-schema'

export const editQrCode = authActionClient
  .schema(qrCodeEditSchema.and(qrCodeIdSchema))
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { id, name, identifier, categoryIds, isRejected } }) => {
    try {
      await prisma.qrCode.update({
        where: { id },
        data: {
          name,
          identifier,
          status: isRejected ? 'REJECTED' : 'ACTIVE',
          categories: { set: categoryIds.map((categoryId) => ({ id: categoryId })) },
        },
      })

      revalidatePath('/events/[eventId]', 'page')
      revalidatePath('/scanner', 'page')
    } catch (error) {
      console.error('Failed to update QR code:', error)
      throw error
    }
  })
