'use client'

import { Copy, Eye } from 'lucide-react'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface ViewQrCodeDialogProps {
  qrCodeImage: string
  qrCodeSecuredToken: string
  trigger?: ReactNode
}

export function ViewQrCodeDialog({ qrCodeImage, qrCodeSecuredToken, trigger }: ViewQrCodeDialogProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View QR Code</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>QR Code Details</DialogTitle>
          <DialogDescription>View QR code information and image.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Token</label>
            <div className="flex gap-2">
              <Input value={qrCodeSecuredToken} readOnly />
              <Button
                variant="outline"
                size="icon"
                className="h-9"
                onClick={() => handleCopy(qrCodeSecuredToken)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">QR Code</label>
            <div className="flex justify-center">
              <Image src={qrCodeImage} alt="QR Code" width={500} height={500} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
