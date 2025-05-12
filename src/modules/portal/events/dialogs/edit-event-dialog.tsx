'use client'

import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Organizations } from '../../organizations/queries/get-organizations'
import { EditEventForm } from '../forms/edit-event-form'
import { EventFormValues } from '../schemas/organization-schema'

interface EditEventDialogProps {
  id: string
  defaultValues: EventFormValues
  organizations: Organizations
  trigger?: React.ReactNode
}

export function EditEventDialog({ id, defaultValues, organizations, trigger }: EditEventDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit event</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Update your event details.</DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <EditEventForm
            id={id}
            defaultValues={defaultValues}
            organizations={organizations}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
