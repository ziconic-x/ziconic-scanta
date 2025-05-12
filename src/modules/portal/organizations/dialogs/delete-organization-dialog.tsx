'use client'

import { Trash2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
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
  DialogTrigger,
} from '@/components/ui/dialog'

import { deleteOrganization } from '../actions/delete-organization'

interface DeleteOrganizationDialogProps {
  organizationId: string
  organizationName: string
  onSuccess?: () => void
}

export function DeleteOrganizationDialog({
  organizationId,
  organizationName,
  onSuccess,
}: DeleteOrganizationDialogProps) {
  const [open, setOpen] = useState(false)

  const { execute, isExecuting } = useAction(deleteOrganization, {
    onSuccess: () => {
      toast.success('Organization deleted successfully')
      setOpen(false)
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete organization</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">Delete Organization</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="font-medium">{organizationName}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <p className="text-muted-foreground text-sm">
            All events, QR codes, and other data associated with this organization will be permanently
            deleted.
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExecuting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => execute({ organizationId })} disabled={isExecuting}>
            {isExecuting ? 'Deleting...' : 'Delete Organization'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
