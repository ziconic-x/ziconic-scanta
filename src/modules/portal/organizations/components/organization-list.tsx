'use client'

import { use } from 'react'

import CustomPagination from '@/components/ui-custom/custom-pagination'

import { OrganizationsPromise } from '../queries/get-organizations'
import { OrganizationFilterNotFound } from './organization-filter-not-found'
import { OrganizationListCard } from './organization-list-card'
import { OrganizationNotFound } from './organization-not-found'

export const OrganizationList = ({
  getOrganizationsPromise,
}: {
  getOrganizationsPromise: OrganizationsPromise
}) => {
  const { organizations, total, totalFiltered } = use(getOrganizationsPromise)

  if (totalFiltered !== undefined && totalFiltered === 0) {
    return <OrganizationFilterNotFound />
  }

  if (total === 0) {
    return <OrganizationNotFound />
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
        {organizations.map((organization) => (
          <OrganizationListCard
            key={organization.id}
            organization={{
              ...organization,
              events: organization.events.map((event) => ({
                ...event,
                _count: event._count,
              })),
            }}
          />
        ))}
      </div>
      <CustomPagination total={total} />
    </div>
  )
}
