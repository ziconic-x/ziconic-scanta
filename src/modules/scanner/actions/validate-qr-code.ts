'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { QrCode } from '@/generated/prisma'

import { validateQrCodeSchema } from '../schemas/qr-code-schema'

export type ValidateQrCode = {
  currentQrCode: QrCode
}

export const validateQrCode = authActionClient
  .schema(validateQrCodeSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { token, eventId }, ctx }) => {
    try {
      return await prisma.$transaction(async (tx) => {
        const qrCode = await prisma.qrCode.findFirst({
          where: {
            eventId,
            securedToken: token,
            expiresAt: { gt: new Date() },
          },
          include: {
            event: {
              select: {
                name: true,
                startDate: true,
              },
            },
          },
        })

        if (!qrCode) {
          throw new Error('QR code not found')
        }

        const recentScan = await prisma.recentScan.create({
          data: {
            scannedById: ctx.session.user.id,
            qrCodeId: qrCode.id,
          },
        })

        if (qrCode.status !== 'ACTIVE') {
          return { currentQrCode: qrCode }
        }

        const currentQrCode = await prisma.qrCode.update({
          where: {
            id: qrCode.id,
          },
          data: {
            status: 'SCANNED',
            updatedAt: new Date(),
          },
          include: {
            event: {
              select: {
                name: true,
                startDate: true,
              },
            },
          },
        })

        revalidatePath('/scanner', 'page')
        revalidatePath(`/events/${eventId}`, 'page')

        return {
          currentQrCode,
          recentScan,
        }
      })
    } catch (error) {
      console.error('Failed to validate QR code:', error)
      throw error
    }
  })
