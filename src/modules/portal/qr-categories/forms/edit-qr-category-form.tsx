'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { editQrCategory } from '../actions/edit-qr-category'
import { QrCategoryFormValues, qrCategorySchema } from '../schemas/qr-category-schema'

type EditQrCategoryFormProps = {
  categoryId: string
  defaultValues: QrCategoryFormValues
  onSuccess?: () => void
}

export function EditQrCategoryForm({ categoryId, defaultValues, onSuccess }: EditQrCategoryFormProps) {
  const { execute, isExecuting } = useAction(editQrCategory, {
    onSuccess: () => {
      toast.success('QR category updated successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const form = useForm<QrCategoryFormValues>({
    resolver: zodResolver(qrCategorySchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => execute({ categoryId, ...data }))} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of the QR category" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description of the QR category" className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Updating...' : 'Update Category'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
