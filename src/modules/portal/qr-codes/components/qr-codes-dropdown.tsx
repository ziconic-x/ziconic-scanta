'use client'

import { MoreHorizontal } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DeleteQrCodeDialog } from '../dialogs/delete-qr-code-dialog'
import { EditQrCodeDialog } from '../dialogs/edit-qr-code-dialog'
import { ViewQrCodeDialog } from '../dialogs/view-qr-code-dialog'
import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodeEditFormValues } from '../schemas/qr-code-schema'

type QrCodesDropdownProps = {
  qrCodeId: string
  qrCodeImage: string
  qrCodeSecuredToken: string
  qrCodeFormValues: QrCodeEditFormValues
  categories: QrCategories
  trigger?: ReactNode
}

export const QrCodesDropdown = ({
  qrCodeId,
  qrCodeImage,
  qrCodeSecuredToken,
  qrCodeFormValues,
  categories,
  trigger,
}: QrCodesDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {qrCodeFormValues.name && (
          <ViewQrCodeDialog
            qrCodeImage={qrCodeImage}
            qrCodeSecuredToken={qrCodeSecuredToken}
            trigger={
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <p>View QR Code</p>
              </DropdownMenuItem>
            }
          />
        )}
        <EditQrCodeDialog
          qrCodeId={qrCodeId}
          qrCodeFormValues={qrCodeFormValues}
          categories={categories}
          trigger={
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <p>Edit</p>
            </DropdownMenuItem>
          }
        />
        <DropdownMenuSeparator />
        <DeleteQrCodeDialog
          qrCodeId={qrCodeId}
          trigger={
            <DropdownMenuItem variant="destructive" asChild onSelect={(e) => e.preventDefault()}>
              <p>Delete</p>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
