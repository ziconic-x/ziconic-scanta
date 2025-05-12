'use client'

import { PlusCircle } from 'lucide-react'
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
import { AddEventForm } from '../forms/add-event-form'

type AddEventDialogProps = {
  organizations: Organizations
}

export const AddEventDialog = ({ organizations }: AddEventDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Create a new event. Fill in the details below.</DialogDescription>
        </DialogHeader>
        <AddEventForm organizations={organizations} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
