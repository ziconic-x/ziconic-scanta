'use client'

import { ReactNode, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { EditQrCategoryForm } from '../forms/edit-qr-category-form'
import { QrCategoryFormValues } from '../schemas/qr-category-schema'

type EditQrCategoryDialogProps = {
  categoryId: string
  categoryFormValues: QrCategoryFormValues
  trigger: ReactNode
}

export const EditQrCategoryDialog = ({
  categoryId,
  categoryFormValues,
  trigger,
}: EditQrCategoryDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit QR Category</DialogTitle>
          <DialogDescription>Update the details of this QR category.</DialogDescription>
        </DialogHeader>
        <EditQrCategoryForm
          categoryId={categoryId}
          defaultValues={categoryFormValues}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
