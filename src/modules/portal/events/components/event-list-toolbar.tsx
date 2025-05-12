'use client'

import { use } from 'react'

import { DebouncedSearchInput } from '@/components/ui-custom/debounced-search-input'

import { OrganizationsPromise } from '../../organizations/queries/get-organizations'
import { AddEventDialog } from '../dialogs/add-event-dialog'
import { EventOrganizationFilter } from './event-organization-filter'

export const EventListToolbar = ({
  getOrganizationsPromise,
}: {
  getOrganizationsPromise: OrganizationsPromise
}) => {
  const { organizations } = use(getOrganizationsPromise)

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <AddEventDialog organizations={organizations} />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="max-w-md flex-1 md:max-w-sm">
          <DebouncedSearchInput />
        </div>
        <EventOrganizationFilter options={organizations.map((org) => ({ label: org.name, value: org.id }))} />
      </div>
    </>
  )
}
