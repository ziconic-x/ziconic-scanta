import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { editQrCode } from '../actions/edit-qr-code'
import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodeEditFormValues, qrCodeEditSchema } from '../schemas/qr-code-schema'
import { EditQrCodeFormFields } from './edit-qr-code-form-fields'

export const EditQrCodeForm = ({
  qrCodeId,
  qrCodeFormValues,
  categories,
  onSuccess,
}: {
  qrCodeId: string
  qrCodeFormValues: QrCodeEditFormValues
  categories: QrCategories
  onSuccess?: () => void
}) => {
  const { execute, isExecuting } = useAction(editQrCode, {
    onSuccess: () => {
      toast.success('QR code updated successfully')
      onSuccess?.()
    },
    onError: () => {
      toast.error('Failed to update QR code')
    },
  })

  const form = useForm<QrCodeEditFormValues>({
    resolver: zodResolver(qrCodeEditSchema),
    defaultValues: {
      name: qrCodeFormValues.name || '',
      identifier: qrCodeFormValues.identifier || '',
      categoryIds: qrCodeFormValues.categoryIds || [],
      isRejected: qrCodeFormValues.isRejected,
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          execute({
            id: qrCodeId,
            name: values.name,
            identifier: values.identifier,
            categoryIds: values.categoryIds,
            isRejected: values.isRejected,
          } as const)
        })}
        className="space-y-4"
      >
        <EditQrCodeFormFields categories={categories} />
        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Updating...' : 'Update QR Code'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
