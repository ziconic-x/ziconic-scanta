import { addDays } from 'date-fns'
import { ArrowLeft, Calendar, QrCode, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { z } from 'zod'

import { NextPageSearchParams } from '@/lib/handy-types'
import { defaultPageIndex } from '@/lib/hooks/use-pagination'

import { DebouncedSearchInput } from '@/components/ui-custom/debounced-search-input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { EventDropdown } from '@/modules/portal/events/components/event-dropdown'
import { EventStatusBadge } from '@/modules/portal/events/components/event-status-badge'
import { FinishEventDialog } from '@/modules/portal/events/dialogs/finish-event-dialog'
import { getEvent } from '@/modules/portal/events/queries/get-event'
import { getOrganizations } from '@/modules/portal/organizations/queries/get-organizations'
import { QrCodesFilters } from '@/modules/portal/qr-codes/components/qr-codes-filters'
import { QrCodesView } from '@/modules/portal/qr-codes/components/qr-codes-view'
import { GenerateQrCodeDialog } from '@/modules/portal/qr-codes/dialogs/generate-qr-code-dialog'
import { getQrCategoriesForGenerator } from '@/modules/portal/qr-codes/queries/get-qr-categories-for-generator'
import { getQrCodes } from '@/modules/portal/qr-codes/queries/get-qr-codes'

const eventDetailsQueryParamsSchema = z.object({
  search: z.string().optional().catch(''),
  pageIndex: z.coerce.number().optional().catch(defaultPageIndex),
  pageSize: z.coerce.number().optional().catch(20),
  status: z.enum(['ACTIVE', 'SCANNED', 'EXPIRED', 'REJECTED']).optional().catch(undefined),
  sortBy: z.enum(['name', 'unnamed', 'createdAt', 'updatedAt']).optional().catch('updatedAt'),
})

export default async function EventDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>
  searchParams: Promise<NextPageSearchParams>
}) {
  const { eventId } = await params
  const parsedParams = eventDetailsQueryParamsSchema.parse(await searchParams)

  if (!eventId) {
    notFound()
  }

  const event = await getEvent(eventId)

  if (!event) {
    notFound()
  }

  const { organizations } = await getOrganizations({ pageIndex: 0, pageSize: 100 })
  const { categories } = await getQrCategoriesForGenerator({})

  const getQrCodesPromise = getQrCodes({
    eventId,
    search: parsedParams.search,
    status: parsedParams.status,
    sortBy: parsedParams.sortBy,
    pageIndex: parsedParams.pageIndex,
    pageSize: parsedParams.pageSize,
  })

  const canFinishEvent = event.status !== 'FINISHED' && addDays(event.startDate, 1) < new Date()

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        size="icon"
        asChild
        className="group hover:bg-muted/50 relative h-10 w-10 rounded-full transition-all"
      >
        <Link href="/events">
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:translate-x-[-4px]" />
          <span className="sr-only">Back to Events</span>
        </Link>
      </Button>

      {/* Cover Image Section */}
      <div className="bg-muted relative h-64 w-full overflow-hidden rounded-lg md:h-80">
        {event.coverImage ? (
          <Image src={event.coverImage} alt={event.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Calendar className="text-muted-foreground/30 h-24 w-24" />
          </div>
        )}
        <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="absolute top-0 left-0 p-6">
          <EventStatusBadge status={event.status} startDate={event.startDate} />
        </div>
        <div className="absolute right-0 bottom-0 left-0 p-6">
          <h1 className="text-4xl font-bold">{event.name}</h1>
          {<p className="mt-2 max-w-2xl">{event.description ?? 'No description'}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div />
        <div className="flex space-x-2">
          {event.status === 'UPCOMING' && !canFinishEvent && (
            <EventDropdown
              eventId={event.id}
              eventFormValues={{
                organizationId: event.organizationId,
                name: event.name,
                description: event.description ?? '',
                address: event.address,
                startDate: event.startDate,
              }}
              organizations={organizations}
              trigger={
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              }
            />
          )}
          {!canFinishEvent && (
            <GenerateQrCodeDialog
              eventId={eventId}
              categories={categories}
              trigger={
                <Button>
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Codes
                </Button>
              }
            />
          )}
          {canFinishEvent && (
            <FinishEventDialog
              eventId={event.id}
              organizationId={event.organizationId}
              eventName={event.name}
              trigger={
                <Button variant="success-outline" className="flex-1">
                  Finish event
                </Button>
              }
            />
          )}
        </div>
      </div>
      <Tabs defaultValue="qr-codes">
        <TabsList>
          <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
        </TabsList>
        <TabsContent value="qr-codes">
          <div className="mt-2 space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="max-w-md flex-1">
                <DebouncedSearchInput />
              </div>
              <QrCodesFilters />
            </div>
            <QrCodesView categories={categories} getQrCodesPromise={getQrCodesPromise} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
