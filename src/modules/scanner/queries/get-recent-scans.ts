import prisma from '@/lib/db'

import { Prisma } from '@/generated/prisma'

export type RecentScansPromise = ReturnType<typeof getRecentScans>
export type RecentScans = Awaited<RecentScansPromise>['scans']
export type GetRecentScansQuery = {
  eventId?: string
}

export const getRecentScans = async ({ eventId }: GetRecentScansQuery) => {
  try {
    const where = {
      qrCode: {
        eventId,
      },
    } as Prisma.RecentScanWhereInput

    const [scans, totalCount] = await Promise.all([
      prisma.recentScan.findMany({
        where,
        include: {
          qrCode: {
            select: {
              id: true,
              name: true,
              identifier: true,
              status: true,
              categories: {
                select: {
                  id: true,
                  name: true,
                },
              },
              event: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          scannedAt: 'desc',
        },
        skip: 0,
        take: 10,
      }),
      prisma.recentScan.count({ where }),
    ])

    return {
      scans,
      total: totalCount,
    }
  } catch (error) {
    console.error('Error fetching recent scans:', error)
    return {
      scans: [],
      total: 0,
    }
  }
}
