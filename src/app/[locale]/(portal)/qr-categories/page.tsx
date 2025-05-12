import { Suspense } from 'react'
import { z } from 'zod'

import { NextPageSearchParams } from '@/lib/handy-types'
import { defaultPageIndex, defaultPageSizeOption } from '@/lib/hooks/use-pagination'

import { getOrganizations } from '@/modules/portal/organizations/queries/get-organizations'
import { QrCategoryList } from '@/modules/portal/qr-categories/components/qr-category-list'
import { QrCategoryListSkeleton } from '@/modules/portal/qr-categories/components/qr-category-list-skeleton'
import { getQrCategories } from '@/modules/portal/qr-categories/queries/get-qr-categories'

const qrCategoryQueryParamsSchema = z.object({
  search: z.string().optional().catch(''),
  pageIndex: z.coerce.number().optional().catch(defaultPageIndex),
  pageSize: z.coerce.number().optional().catch(defaultPageSizeOption),
  organizationId: z.string().optional(),
  visibility: z.enum(['public', 'restricted', 'organization']).optional().catch('public'),
})

export default async function QRCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<NextPageSearchParams>
}) {
  const parsedParams = qrCategoryQueryParamsSchema.parse(await searchParams)

  const getQrCategoriesPromise = getQrCategories({
    search: parsedParams.search,
    organizationId: parsedParams.organizationId,
    visibility: parsedParams.visibility,
    pageIndex: parsedParams.pageIndex,
    pageSize: parsedParams.pageSize,
  })

  const getOrganizationsPromise = getOrganizations({
    pageIndex: 0,
    pageSize: 100,
  })

  return (
    <div className="flex-1 space-y-4 p-6">
      <Suspense fallback={<QrCategoryListSkeleton />}>
        <QrCategoryList
          getQrCategoriesPromise={getQrCategoriesPromise}
          getOrganizationsPromise={getOrganizationsPromise}
        />
      </Suspense>
    </div>
  )
}
