import prisma from '@/lib/db'
import { defaultPageSizeOption } from '@/lib/hooks/use-pagination'

import { Prisma } from '@/generated/prisma'

export type EventsPromise = ReturnType<typeof getEvents>
export type Events = Awaited<EventsPromise>['events']
export type GetEventsQuery = {
  search?: string
  pageIndex?: number
  pageSize?: number
  organizationId?: string
}

export const getEvents = async ({
  search,
  pageIndex = 0,
  pageSize = defaultPageSizeOption,
  organizationId,
}: GetEventsQuery) => {
  try {
    const where = (
      search
        ? {
            organizationId,
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { description: { contains: search, mode: 'insensitive' as const } },
              { address: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : { organizationId }
    ) as Prisma.EventWhereInput

    const [events, totalCount] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              qrCodes: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: pageIndex * pageSize,
        take: pageSize,
      }),
      prisma.event.count({ where }),
    ])

    return {
      events,
      total: totalCount,
      totalFiltered: search || organizationId ? totalCount : undefined,
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      events: [],
      total: 0,
    }
  }
}
