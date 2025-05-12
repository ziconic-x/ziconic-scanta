'use client'

import { use } from 'react'

import CustomPagination from '@/components/ui-custom/custom-pagination'
import { DebouncedSearchInput } from '@/components/ui-custom/debounced-search-input'

import { OrganizationsPromise } from '../../organizations/queries/get-organizations'
import { AddQrCategoryDialog } from '../dialogs/add-qr-category-dialog'
import { QrCategoriesPromise } from '../queries/get-qr-categories'
import { QrCategoryCard } from './qr-category-card'
import { QrCategoryFilter } from './qr-category-filter'
import { QrCategoryFilterNotFound } from './qr-category-filter-not-found'
import { QrCategoryNotFound } from './qr-category-not-found'

export const QrCategoryList = ({
  getQrCategoriesPromise,
  getOrganizationsPromise,
}: {
  getQrCategoriesPromise: QrCategoriesPromise
  getOrganizationsPromise: OrganizationsPromise
}) => {
  const { categories, total, totalFiltered } = use(getQrCategoriesPromise)
  const { organizations } = use(getOrganizationsPromise)

  const Wrapper = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">QR Categories</h2>
        <AddQrCategoryDialog organizations={organizations} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="max-w-md flex-1 md:max-w-sm">
          <DebouncedSearchInput />
        </div>
        <QrCategoryFilter options={organizations.map((org) => ({ label: org.name, value: org.id }))} />
      </div>
    </>
  )

  if (totalFiltered !== undefined && totalFiltered === 0) {
    return (
      <>
        {Wrapper}
        <QrCategoryFilterNotFound />
      </>
    )
  }

  if (total === 0) {
    return (
      <>
        {Wrapper}
        <QrCategoryNotFound organizations={organizations} />
      </>
    )
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {Wrapper}
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <QrCategoryCard key={category.id} category={category} />
        ))}
      </div>
      <CustomPagination total={total} />
    </div>
  )
}
