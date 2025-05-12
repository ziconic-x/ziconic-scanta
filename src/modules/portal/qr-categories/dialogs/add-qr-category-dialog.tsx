'use client'

import { PlusCircle } from 'lucide-react'
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

import { Organizations } from '../../organizations/queries/get-organizations'
import { AddQrCategoryForm } from '../forms/add-qr-category-form'

type AddQrCategoryDialogProps = {
  organizations: Organizations
  trigger?: ReactNode
}

export const AddQrCategoryDialog = ({ organizations, trigger }: AddQrCategoryDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create QR Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create QR Category</DialogTitle>
          <DialogDescription>Create a new QR category. Fill in the details below.</DialogDescription>
        </DialogHeader>
        <AddQrCategoryForm onSuccess={() => setOpen(false)} organizations={organizations} />
      </DialogContent>
    </Dialog>
  )
}
