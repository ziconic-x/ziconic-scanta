import { VariantProps } from 'class-variance-authority'
import { isToday } from 'date-fns'

import { Badge } from '@/components/ui/badge'

import { EventStatus } from '@/generated/prisma/client'

type EventStatusBadgeProps = {
  status: EventStatus
  startDate: Date
}

export const EventStatusBadge = ({ status, startDate }: EventStatusBadgeProps) => {
  const eventStatusMapping: Record<
    EventStatus,
    { label: string; variant: VariantProps<typeof Badge>['variant'] }
  > = {
    UPCOMING: {
      label: isToday(startDate) ? 'Today' : 'Upcoming',
      variant: isToday(startDate) ? 'destructive' : 'warning',
    },
    FINISHED: {
      label: 'Finished',
      variant: 'success',
    },
  }
  return <Badge variant={eventStatusMapping[status].variant}>{eventStatusMapping[status].label}</Badge>
}
