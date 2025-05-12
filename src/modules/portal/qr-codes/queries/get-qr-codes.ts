import prisma from '@/lib/db'

import { Prisma } from '@/generated/prisma'

export type GetQrCodesQuery = {
  eventId: string
  search?: string
  status?: string
  sortBy?: string
  pageIndex?: number
  pageSize?: number
}

export type QrCodesPromise = ReturnType<typeof getQrCodes>
export type QrCodes = Awaited<ReturnType<typeof getQrCodes>>['qrCodes']

export const getQrCodes = async ({
  eventId,
  search,
  status,
  sortBy = 'updatedAt',
  pageIndex = 0,
  pageSize = 20,
}: GetQrCodesQuery) => {
  try {
    const where = {
      eventId,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { identifier: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(status ? { status } : {}),
    } as Prisma.QrCodeWhereInput

    const orderBy = (() => {
      switch (sortBy) {
        case 'name':
          return { name: 'asc' as const }
        case 'unnamed':
          return { name: { sort: 'asc' as const, nulls: 'first' as const } }
        case 'createdAt':
          return { createdAt: 'desc' as const }
        case 'updatedAt':
        default:
          return { updatedAt: 'desc' as const }
      }
    })()

    const [qrCodes, totalCount] = await Promise.all([
      prisma.qrCode.findMany({
        where,
        include: {
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy,
        skip: pageIndex * pageSize,
        take: pageSize,
      }),
      prisma.qrCode.count({ where }),
    ])

    return {
      qrCodes,
      total: totalCount,
      totalFiltered: search || status ? totalCount : undefined,
    }
  } catch (error) {
    console.error('Error fetching QR codes:', error)
    return {
      qrCodes: [],
      total: 0,
    }
  }
}
