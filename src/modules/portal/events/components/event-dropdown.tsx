'use client'

import { MoreHorizontal } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Organizations } from '../../organizations/queries/get-organizations'
import { CancelEventDialog } from '../dialogs/cancel-event-dialog'
import { EditEventDialog } from '../dialogs/edit-event-dialog'
import { EventFormValues } from '../schemas/organization-schema'

type EventDropdownProps = {
  eventId: string
  eventFormValues: EventFormValues
  organizations: Organizations
  trigger?: ReactNode
}

export const EventDropdown = ({ eventId, eventFormValues, organizations, trigger }: EventDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleCopyEventId = () => {
    navigator.clipboard.writeText(eventId)
    toast.success('Event ID copied to clipboard')
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyEventId}>Copy Event ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <EditEventDialog
          id={eventId}
          defaultValues={eventFormValues}
          organizations={organizations}
          trigger={
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <p>Edit event</p>
            </DropdownMenuItem>
          }
        />
        <DropdownMenuSeparator />
        <CancelEventDialog
          eventId={eventId}
          organizationId={eventFormValues.organizationId}
          eventName={eventFormValues.name}
          trigger={
            <DropdownMenuItem disabled variant="destructive" asChild onSelect={(e) => e.preventDefault()}>
              <p>Cancel event</p>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
