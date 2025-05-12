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

import { finishEvent } from '../actions/finish-event'

interface FinishEventDialogProps {
  eventId: string
  organizationId: string
  eventName: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function FinishEventDialog({
  eventId,
  organizationId,
  eventName,
  trigger,
  onSuccess,
}: FinishEventDialogProps) {
  const [open, setOpen] = useState(false)

  const { execute, isExecuting } = useAction(finishEvent, {
    onSuccess: () => {
      toast.success('Event marked as finished')
      setOpen(false)
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to finish event')
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <XCircle className="h-4 w-4" />
            <span className="sr-only">Finish event</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finish Event</DialogTitle>
          <DialogDescription>Are you sure you want to mark this event as finished?</DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Confirmation</AlertTitle>
          <AlertDescription>
            You are about to mark the event "{eventName}" as finished. This will update the event status and
            cannot be undone.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExecuting}>
            No, keep as upcoming
          </Button>
          <Button
            variant="success"
            onClick={() => execute({ eventId, organizationId })}
            disabled={isExecuting}
          >
            {isExecuting ? 'Finishing...' : 'Yes, finish event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
