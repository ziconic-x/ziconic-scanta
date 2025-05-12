import prisma from '@/lib/db'
import { defaultPageSizeOption } from '@/lib/hooks/use-pagination'

export type OrganizationsPromise = ReturnType<typeof getOrganizations>
export type Organizations = Awaited<OrganizationsPromise>['organizations']

export type GetOrganizationsQuery = {
  search?: string
  pageIndex?: number
  pageSize?: number
}

export const getOrganizations = async ({
  search,
  pageIndex = 0,
  pageSize = defaultPageSizeOption,
}: GetOrganizationsQuery) => {
  const where = search
    ? {
        name: { contains: search, mode: 'insensitive' as const },
      }
    : {}

  const [organizations, totalCount] = await Promise.all([
    prisma.organization.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            events: true,
          },
        },
        events: {
          select: {
            _count: {
              select: {
                qrCodes: true,
              },
            },
          },
        },
        createdAt: true,
      },
      skip: pageIndex * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.organization.count({ where }),
  ])

  return {
    organizations,
    total: totalCount,
    totalFiltered: search ? totalCount : undefined,
  }
}
