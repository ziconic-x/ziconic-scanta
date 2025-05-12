'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { qrCategorySchema } from '../schemas/qr-category-schema'

export const addQrCategory = authActionClient
  .schema(qrCategorySchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { name, description, isPublic, organizationId } }) => {
    try {
      if (isPublic) {
        await prisma.qrCodeCategory.create({
          data: {
            name,
            description,
            isPublic: true,
            organizationId: null,
          },
        })
      } else {
        if (!organizationId) {
          throw new Error('Organization ID is required for non-public categories')
        }

        await prisma.qrCodeCategory.create({
          data: {
            name,
            description,
            organizationId,
          },
        })
      }

      revalidatePath('/qr-categories')
    } catch (error) {
      console.error('Failed to add QR category:', error)
      throw error
    }
  })
