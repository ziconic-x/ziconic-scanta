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

import { EditOrganizationForm } from '../forms/edit-organization-form'
import { OrganizationFormValues } from '../schemas/organization-schema'

interface EditOrganizationDialogProps {
  organizationId: string
  defaultValues: OrganizationFormValues
  trigger?: React.ReactNode
}

export function EditOrganizationDialog({
  organizationId,
  defaultValues,
  trigger,
}: EditOrganizationDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit organization</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription>Update your organization details.</DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <EditOrganizationForm
            organizationId={organizationId}
            defaultValues={defaultValues}
            onSuccess={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
