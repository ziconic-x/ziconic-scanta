import { notFound } from 'next/navigation'

import { getUserSession } from '@/lib/get-user-session'

import { getScannerEvents } from '@/modules/portal/events/queries/get-scanner-events'
import { ScannerChooseEvent } from '@/modules/scanner/components/scanner/scanner-choose-event'

export default async function ScannerPage() {
  const userSession = await getUserSession()

  if (!userSession) {
    return notFound()
  }

  const scannerEventsPromise = getScannerEvents({ organizationId: userSession.organizationId || '' })

  return <ScannerChooseEvent getScannerEventsPromise={scannerEventsPromise} />
}
