'use client'

import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { checkEventStatus } from '@/modules/scanner/actions/check-event-status'

export function EventIdDialog() {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(true)
  const [input, setInput] = useState('')
  const [eventId, setEventId] = useQueryState('eventId', { shallow: false })

  const { execute, isExecuting } = useAction(checkEventStatus, {
    onSuccess: (result) => {
      if (result.data && input) {
        setEventId(input)
        setIsOpen(false)

        toast.success('Event ID set successfully')
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Failed to set event ID')
    },
  })

  const handleClose = () => {
    setIsOpen(false)
    router.back()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Event ID</DialogTitle>
          <DialogDescription>
            Please enter the event ID to continue. This will be saved for future visits.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await execute({ eventId: input })
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="eventId">Event ID</Label>
            <Input
              name="eventId"
              placeholder="Enter event ID"
              required
              defaultValue={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isExecuting}>
              {isExecuting ? 'Setting...' : 'Set Event ID'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
