'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { qrCategoryIdSchema, qrCategorySchema } from '../schemas/qr-category-schema'

export const editQrCategory = authActionClient
  .schema(qrCategoryIdSchema.and(qrCategorySchema))
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { categoryId, name, description, isPublic, organizationId } }) => {
    try {
      if (isPublic) {
        await prisma.qrCodeCategory.update({
          where: { id: categoryId },
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

        await prisma.qrCodeCategory.update({
          where: { id: categoryId },
          data: { name, description, isPublic: false, organizationId },
        })
      }
      revalidatePath('/qr-categories')
    } catch (error) {
      console.error('Failed to update QR category:', error)
      throw error
    }
  })
