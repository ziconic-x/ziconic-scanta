import prisma from '@/lib/db'
import { getUserSession } from '@/lib/get-user-session'

import { Prisma } from '@/generated/prisma'

export type ScannerEventsPromise = ReturnType<typeof getScannerEvents>
export type ScannerEvents = Awaited<ScannerEventsPromise>
export type GetScannerEventsQuery = {
  organizationId?: string
}

export const getScannerEvents = async ({ organizationId }: GetScannerEventsQuery) => {
  try {
    const user = await getUserSession()

    if (!user) {
      return { events: [] }
    }

    let where = {} as Prisma.EventWhereInput

    if (user.isScanner && !organizationId) {
      return { events: [] }
    }

    if (user.isScanner) {
      where = { organizationId, status: { not: 'FINISHED' } } as Prisma.EventWhereInput
    }

    if (user.isSystemAdmin || user.isAdmin) {
      where = { status: { not: 'FINISHED' } } as Prisma.EventWhereInput
    }

    const events = await prisma.event.findMany({
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
    })

    return { events }
  } catch (error) {
    console.error('Error fetching events:', error)
    return { events: [] }
  }
}
