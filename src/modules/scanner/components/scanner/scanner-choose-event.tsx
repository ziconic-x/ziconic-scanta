'use client'

import { ArrowRight } from 'lucide-react'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Link, useRouter } from '@/i18n/navigation'
import { ScannerEventsPromise } from '@/modules/portal/events/queries/get-scanner-events'

export const ScannerChooseEvent = ({
  getScannerEventsPromise,
}: {
  getScannerEventsPromise: ScannerEventsPromise
}) => {
  const router = useRouter()

  const { events } = use(getScannerEventsPromise)

  if (events.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">No Active Events</h1>
          <p className="text-muted-foreground">
            There are no active events for your organization at the moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Select an Event</h1>
            <p className="text-muted-foreground">Choose an event to start scanning QR codes</p>
          </div>
        </div>
      </div>
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <Link key={event.id} href={`/scanner/${event.id}`} className="block">
            <Card className="group hover:border-primary relative h-full overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="group-hover:text-primary text-xl font-bold transition-colors">
                    {event.name}
                  </CardTitle>
                  <CardDescription>{event.organization.name}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push(`/events/${event.id}`)
                  }}
                >
                  View {event._count.qrCodes} QR codes
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {event.description || 'No description available'}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    {new Date(event.startDate).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="text-muted-foreground h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
