import { Suspense } from 'react'
import { z } from 'zod'

import { NextPageSearchParams } from '@/lib/handy-types'
import { defaultPageIndex, defaultPageSizeOption } from '@/lib/hooks/use-pagination'

import { DebouncedSearchInput } from '@/components/ui-custom/debounced-search-input'

import { OrganizationList } from '@/modules/portal/organizations/components/organization-list'
import { OrganizationListSkeleton } from '@/modules/portal/organizations/components/organization-list-skeleton'
import { AddOrganizationDialog } from '@/modules/portal/organizations/dialogs/add-organization-dialog'
import { getOrganizations } from '@/modules/portal/organizations/queries/get-organizations'

const organizationQueryParamsSchema = z.object({
  search: z.string().optional().catch(''),
  pageIndex: z.coerce.number().optional().catch(defaultPageIndex),
  pageSize: z.coerce.number().optional().catch(defaultPageSizeOption),
})

export default async function OrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<NextPageSearchParams>
}) {
  const parsedParams = organizationQueryParamsSchema.parse(await searchParams)

  const getOrganizationsPromise = getOrganizations({
    search: parsedParams.search,
    pageIndex: parsedParams.pageIndex,
    pageSize: parsedParams.pageSize,
  })

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
        <AddOrganizationDialog />
      </div>
      <div className="max-w-md flex-1 md:max-w-sm">
        <DebouncedSearchInput />
      </div>
      <Suspense fallback={<OrganizationListSkeleton />}>
        <OrganizationList getOrganizationsPromise={getOrganizationsPromise} />
      </Suspense>
    </div>
  )
}
