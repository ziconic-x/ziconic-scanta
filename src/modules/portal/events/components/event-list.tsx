'use client'

import { use } from 'react'

import CustomPagination from '@/components/ui-custom/custom-pagination'

import { OrganizationsPromise } from '../../organizations/queries/get-organizations'
import { QrCategoriesForGeneratorPromise } from '../../qr-codes/queries/get-qr-categories-for-generator'
import { EventPromise } from '../queries/get-events'
import { EventFilterNotFound } from './event-filter-not-found'
import { EventListCard } from './event-list-card'
import { EventNotFound } from './event-not-found'

export const EventList = ({
  getEventsPromise,
  getOrganizationsPromise,
  getQrCategoriesPromise,
}: {
  getEventsPromise: EventPromise
  getOrganizationsPromise: OrganizationsPromise
  getQrCategoriesPromise: QrCategoriesForGeneratorPromise
}) => {
  const { events, total, totalFiltered } = use(getEventsPromise)
  const { organizations } = use(getOrganizationsPromise)
  const { categories } = use(getQrCategoriesPromise)

  if (totalFiltered !== undefined && totalFiltered === 0) {
    return <EventFilterNotFound />
  }

  if (total === 0) {
    return <EventNotFound />
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <EventListCard
              key={event.id}
              event={event}
              organizations={organizations}
              categories={categories}
            />
          ))}
        </div>
        <CustomPagination total={total} />
      </div>
    </>
  )
}
