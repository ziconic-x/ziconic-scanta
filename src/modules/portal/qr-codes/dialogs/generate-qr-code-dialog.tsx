'use client'

import { QrCode } from 'lucide-react'
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

import { GenerateQrCodeForm } from '../forms/generate-qr-code-form'
import { QrCategories } from '../queries/get-qr-categories-for-generator'

interface GenerateQrCodeDialogProps {
  eventId: string
  categories: QrCategories
  trigger?: React.ReactNode
}

export function GenerateQrCodeDialog({ eventId, categories, trigger }: GenerateQrCodeDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR Code
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate QR Code</DialogTitle>
          <DialogDescription>Generate QR codes for your event. Fill in the details below.</DialogDescription>
        </DialogHeader>
        <GenerateQrCodeForm eventId={eventId} categories={categories} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
