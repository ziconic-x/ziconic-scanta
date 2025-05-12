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

import { DeleteQrCategoryDialog } from '../dialogs/delete-qr-category-dialog'
import { EditQrCategoryDialog } from '../dialogs/edit-qr-category-dialog'
import { QrCategoryFormValues } from '../schemas/qr-category-schema'

type QrCategoryDropdownProps = {
  categoryId: string
  categoryFormValues: QrCategoryFormValues
  trigger?: ReactNode
}

export const QrCategoryDropdown = ({ categoryId, categoryFormValues, trigger }: QrCategoryDropdownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditQrCategoryDialog
          categoryId={categoryId}
          categoryFormValues={categoryFormValues}
          trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit category</DropdownMenuItem>}
        />
        <DropdownMenuSeparator />
        <DeleteQrCategoryDialog
          categoryId={categoryId}
          categoryName={categoryFormValues.name}
          trigger={
            <DropdownMenuItem variant="destructive" asChild onSelect={(e) => e.preventDefault()}>
              <p>Delete QR category</p>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
