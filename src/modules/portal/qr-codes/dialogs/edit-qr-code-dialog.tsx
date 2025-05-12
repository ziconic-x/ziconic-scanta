'use client'

import { Pencil } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { EditQrCodeForm } from '../forms/edit-qr-code-form'
import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodeEditFormValues } from '../schemas/qr-code-schema'

interface EditQrCodeDialogProps {
  qrCodeId: string
  qrCodeFormValues: QrCodeEditFormValues
  categories: QrCategories
  trigger?: ReactNode
}

export function EditQrCodeDialog({ qrCodeId, qrCodeFormValues, categories, trigger }: EditQrCodeDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit QR Code</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit QR Code</DialogTitle>
          <DialogDescription>Update QR code details and categories.</DialogDescription>
        </DialogHeader>
        <EditQrCodeForm
          qrCodeId={qrCodeId}
          qrCodeFormValues={qrCodeFormValues}
          categories={categories}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
