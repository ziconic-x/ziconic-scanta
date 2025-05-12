'use server'

import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'
import { authActionClient } from '@/lib/safe-action'

import { qrCategoryIdSchema } from '../schemas/qr-category-schema'

export const deleteQrCategory = authActionClient
  .schema(qrCategoryIdSchema)
  .metadata({ permission: 'access:organization-portal' })
  .action(async ({ clientInput: { categoryId } }) => {
    try {
      await prisma.qrCodeCategory.delete({
        where: { id: categoryId },
      })
      revalidatePath('/qr-categories')
    } catch (error) {
      console.error('Failed to delete QR category:', error)
      throw error
    }
  })
