import { Suspense } from 'react'
import { z } from 'zod'

import { NextPageSearchParams } from '@/lib/handy-types'
import { defaultPageIndex, defaultPageSizeOption } from '@/lib/hooks/use-pagination'

import { EventList } from '@/modules/portal/events/components/event-list'
import { EventListSkeleton } from '@/modules/portal/events/components/event-list-skeleton'
import { EventListToolbar } from '@/modules/portal/events/components/event-list-toolbar'
import { getEvents } from '@/modules/portal/events/queries/get-events'
import { getOrganizations } from '@/modules/portal/organizations/queries/get-organizations'
import { getQrCategoriesForGenerator } from '@/modules/portal/qr-codes/queries/get-qr-categories-for-generator'

const eventQueryParamsSchema = z.object({
  search: z.string().optional().catch(''),
  pageIndex: z.coerce.number().optional().catch(defaultPageIndex),
  pageSize: z.coerce.number().optional().catch(defaultPageSizeOption),
  organizationId: z.string().optional(),
})

export default async function EventsPage({ searchParams }: { searchParams: Promise<NextPageSearchParams> }) {
  const parsedParams = eventQueryParamsSchema.parse(await searchParams)

  const getEventsPromise = getEvents({
    search: parsedParams.search,
    pageIndex: parsedParams.pageIndex,
    pageSize: parsedParams.pageSize,
    organizationId: parsedParams.organizationId,
  })

  const getOrganizationsPromise = getOrganizations({
    pageIndex: 0,
    pageSize: 100,
  })

  const getQrCategoriesPromise = getQrCategoriesForGenerator({
    organizationId: parsedParams.organizationId,
  })

  return (
    <div className="flex-1 space-y-4 p-6">
      <Suspense>
        <EventListToolbar getOrganizationsPromise={getOrganizationsPromise} />
      </Suspense>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList
          getEventsPromise={getEventsPromise}
          getOrganizationsPromise={getOrganizationsPromise}
          getQrCategoriesPromise={getQrCategoriesPromise}
        />
      </Suspense>
    </div>
  )
}
