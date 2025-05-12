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

import { deleteQrCode } from '../actions/delete-qr-code'

interface DeleteQrCodeDialogProps {
  qrCodeId: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function DeleteQrCodeDialog({ qrCodeId, trigger, onSuccess }: DeleteQrCodeDialogProps) {
  const [open, setOpen] = useState(false)

  const { execute, isExecuting } = useAction(deleteQrCode, {
    onSuccess: () => {
      toast.success('QR code deleted successfully')
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
          <DialogTitle>Delete QR Code</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this QR code? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            You are about to delete the QR code "{qrCodeId}". This will delete the QR code and it cannot be
            undone.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isExecuting}>
            No, keep QR code
          </Button>
          <Button variant="destructive" onClick={() => execute({ id: qrCodeId })} disabled={isExecuting}>
            {isExecuting ? 'Deleting...' : 'Yes, delete QR code'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
