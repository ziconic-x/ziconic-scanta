'use client'

import { AlertTriangle, XCircle } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { cancelEvent } from '../actions/cancel-event'

interface CancelEventDialogProps {
  eventId: string
  organizationId: string
  eventName: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function CancelEventDialog({
  eventId,
  organizationId,
  eventName,
  trigger,
  onSuccess,
}: CancelEventDialogProps) {
  const [open, setOpen] = useState(false)

  const { execute, isExecuting } = useAction(cancelEvent, {
    onSuccess: () => {
      toast.success('Event cancelled successfully')
      setOpen(false)
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to cancel event')
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <XCircle className="h-4 w-4" />
            <span className="sr-only">Cancel event</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Event</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this event? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            You are about to cancel the event "{eventName}". This will delete the event and it cannot be
            undone.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExecuting}>
            No, keep event
          </Button>
          <Button
            variant="destructive"
            onClick={() => execute({ eventId, organizationId })}
            disabled={isExecuting}
          >
            {isExecuting ? 'Cancelling...' : 'Yes, cancel event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
