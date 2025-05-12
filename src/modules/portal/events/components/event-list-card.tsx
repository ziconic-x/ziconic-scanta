'use client'

import { addDays, format } from 'date-fns'
import { CalendarDays, MapPin, QrCode } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from '@/i18n/navigation'

import { Organizations } from '../../organizations/queries/get-organizations'
import { GenerateQrCodeDialog } from '../../qr-codes/dialogs/generate-qr-code-dialog'
import { QrCategories } from '../../qr-codes/queries/get-qr-categories-for-generator'
import { FinishEventDialog } from '../dialogs/finish-event-dialog'
import { Events } from '../queries/get-events'
import { EventDropdown } from './event-dropdown'
import { EventStatusBadge } from './event-status-badge'

export const EventListCard = ({
  event,
  organizations,
  categories,
}: {
  event: Events[number]
  organizations: Organizations
  categories: QrCategories
}) => {
  const canFinishEvent = event.status !== 'FINISHED' && addDays(event.startDate, 1) < new Date()

  return (
    <Card key={event.id} className={cn(canFinishEvent && 'border border-green-500')}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
            {!canFinishEvent && <EventStatusBadge status={event.status} startDate={event.startDate} />}
          </div>
          <CardDescription>{event.organization.name}</CardDescription>
        </div>
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
          />
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="text-muted-foreground h-4 w-4" />
          <span className="text-sm">{format(event.startDate, 'MMM d, yyyy')}</span>
          <MapPin className="text-muted-foreground h-4 w-4" />
          <span className="text-sm">{event.address}</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 space-x-4 rounded-md border p-4">
          <div className="flex items-center gap-2">
            <QrCode className="text-muted-foreground h-8 w-8" />
            <p className="text-sm leading-none font-medium">{event._count.qrCodes} QR codes</p>
          </div>
          {!canFinishEvent && (
            <GenerateQrCodeDialog
              eventId={event.id}
              categories={categories}
              trigger={
                <Button variant="outline" size="sm">
                  Generate
                </Button>
              }
            />
          )}
        </div>

        <div className="flex w-full flex-row flex-wrap items-center gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/events/${event.id}`}>View Details</Link>
          </Button>
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
      </CardContent>
    </Card>
  )
}
