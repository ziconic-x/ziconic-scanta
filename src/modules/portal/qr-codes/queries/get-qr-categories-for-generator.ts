import prisma from '@/lib/db'

import { Prisma } from '@/generated/prisma'

export type GetQrCategoriesForGeneratorQuery = {
  organizationId?: string
}

export type QrCategoriesForGeneratorPromise = ReturnType<typeof getQrCategoriesForGenerator>
export type QrCategories = Awaited<QrCategoriesForGeneratorPromise>['categories']

export const getQrCategoriesForGenerator = async ({ organizationId }: GetQrCategoriesForGeneratorQuery) => {
  try {
    const where = {
      OR: [{ isPublic: true }, ...(organizationId ? [{ isPublic: false, organizationId }] : [])],
    } as Prisma.QrCodeCategoryWhereInput

    const categories = await prisma.qrCodeCategory.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    })

    return {
      categories,
    }
  } catch (error) {
    console.error('Error fetching QR categories for generator:', error)
    return {
      categories: [],
    }
  }
}
