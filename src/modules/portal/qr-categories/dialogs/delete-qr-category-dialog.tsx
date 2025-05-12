'use client'

import { ReactNode, useState } from 'react'

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

import { deleteQrCategory } from '../actions/delete-qr-category'

type DeleteQrCategoryDialogProps = {
  categoryId: string
  categoryName: string
  trigger: ReactNode
}

export const DeleteQrCategoryDialog = ({
  categoryId,
  categoryName,
  trigger,
}: DeleteQrCategoryDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteQrCategory({ categoryId })
      setOpen(false)
    } catch (error) {
      console.error('Failed to delete QR category:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete QR Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the QR category &quot;{categoryName}&quot;? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
