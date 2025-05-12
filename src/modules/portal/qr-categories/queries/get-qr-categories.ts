import prisma from '@/lib/db'
import { defaultPageSizeOption } from '@/lib/hooks/use-pagination'

import { Prisma } from '@/generated/prisma'

export type GetQrCategoriesQuery = {
  search?: string
  organizationId?: string
  visibility?: 'public' | 'restricted' | 'organization'
  pageIndex?: number
  pageSize?: number
}

export type QrCategoriesPromise = ReturnType<typeof getQrCategories>
export type QrCategories = Awaited<ReturnType<typeof getQrCategories>>['categories']

export const getQrCategories = async ({
  search,
  organizationId,
  visibility,
  pageIndex = 0,
  pageSize = defaultPageSizeOption,
}: GetQrCategoriesQuery) => {
  try {
    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { description: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(organizationId ? { organizationId } : {}),
      ...(visibility === 'public' ? { isPublic: true } : {}),
      ...(visibility === 'restricted' ? { isPublic: false, organizationId: { not: null } } : {}),
    } as Prisma.QrCodeCategoryWhereInput

    const [categories, totalCount] = await Promise.all([
      prisma.qrCodeCategory.findMany({
        where,
        include: {
          _count: {
            select: {
              qrCodes: true,
            },
          },
          organization: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: pageIndex * pageSize,
        take: pageSize,
      }),
      prisma.qrCodeCategory.count({ where }),
    ])

    return {
      categories,
      total: totalCount,
      totalFiltered: search || organizationId || visibility ? totalCount : undefined,
    }
  } catch (error) {
    console.error(error)
    return {
      categories: [],
      total: 0,
    }
  }
}
