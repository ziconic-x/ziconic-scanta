import { Suspense, use } from 'react'

import CustomPagination from '@/components/ui-custom/custom-pagination'

import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodesPromise } from '../queries/get-qr-codes'
import { QrCodesFilterNotFound } from './qr-codes-filter-not-found'
import { QrCodesGrid } from './qr-codes-grid'
import { QrCodesNotFound } from './qr-codes-not-found'

type QrCodesViewProps = {
  categories: QrCategories
  getQrCodesPromise: QrCodesPromise
}

export const QrCodesView = ({ categories, getQrCodesPromise }: QrCodesViewProps) => {
  const { qrCodes, total, totalFiltered } = use(getQrCodesPromise)

  if (totalFiltered !== undefined && totalFiltered === 0) {
    return <QrCodesFilterNotFound />
  }

  if (total === 0) {
    return <QrCodesNotFound />
  }

  return (
    <div className="flex-1 space-y-4">
      <Suspense>
        <div className="flex w-full flex-col gap-4">
          <QrCodesGrid qrCodes={qrCodes} categories={categories} />
          <CustomPagination total={total} pageSize={20} />
        </div>
      </Suspense>
    </div>
  )
}
