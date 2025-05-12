import { Suspense } from 'react'

import { ScannerView } from '@/modules/scanner/components/scanner/scanner-view'
import { getRecentScans } from '@/modules/scanner/queries/get-recent-scans'

export default async function ScannerEventPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params

  const recentScansPromise = getRecentScans({ eventId })

  return (
    <div className="flex-1 space-y-4 p-6">
      <Suspense>
        <ScannerView eventId={eventId} recentScansPromise={recentScansPromise} />
      </Suspense>
    </div>
  )
}
