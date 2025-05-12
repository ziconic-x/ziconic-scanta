'use server'

import { addDays } from 'date-fns'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { generateQRCodeBase64 } from '@/lib/qr-code'
import { authActionClient } from '@/lib/safe-action'
import { generateSecureToken } from '@/lib/secure-token'

import { QrCodeStatus } from '@/generated/prisma/client'

import { eventIdSchema, qrCodeSchema } from '../schemas/qr-code-schema'

interface QrCodeInput {
  eventId: string
  categoryIds: string[]
  quantity: number
}

export const generateQrCodes = authActionClient
  .schema(eventIdSchema.and(qrCodeSchema))
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ parsedInput }: { parsedInput: QrCodeInput }) => {
    const { eventId, categoryIds, quantity } = parsedInput

    try {
      await prisma.$transaction(async (tx) => {
        const event = await tx.event.findUniqueOrThrow({
          where: {
            id: eventId,
          },
        })

        const eventShouldBeFinished = event.status === 'FINISHED' || addDays(event.startDate, 1) < new Date()
        if (eventShouldBeFinished) {
          throw new Error('Can`t generate QR codes for an event that is in the finish process')
        }

        const qrCodePromises = []
        for (let i = 0; i < quantity; i++) {
          const securedToken = generateSecureToken()
          // Generate QR code with the secured token and optional metadata
          const qrCodeData = JSON.stringify({
            token: securedToken,
            eventId,
            timestamp: Date.now(),
          })

          const qrCodeBase64 = await generateQRCodeBase64(qrCodeData)

          qrCodePromises.push(
            tx.qrCode.create({
              data: {
                eventId,
                status: QrCodeStatus.ACTIVE,
                expiresAt: addDays(event.startDate, 1),
                securedToken,
                qrCodeBase64,
                categories: {
                  connect: categoryIds.map((id) => ({ id })),
                },
              },
            }),
          )
        }
        return await Promise.all(qrCodePromises)
      })

      revalidatePath(`/events`)
      revalidatePath(`/organizations`)
      revalidatePath(`/events/${eventId}`)
    } catch (error) {
      console.error('Error generating QR codes:', error)
      throw new Error('Failed to generate QR codes')
    }
  })
