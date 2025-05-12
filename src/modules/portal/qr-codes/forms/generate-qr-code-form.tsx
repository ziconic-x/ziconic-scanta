'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { generateQrCodes } from '../actions/generate-qr-codes'
import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodeFormValues, qrCodeSchema } from '../schemas/qr-code-schema'
import { GenerateQrCodeFormFields } from './generate-qr-code-form-fields'

interface GenerateQrCodeFormProps {
  eventId: string
  categories: QrCategories
  onSuccess?: () => void
}

export function GenerateQrCodeForm({ eventId, categories, onSuccess }: GenerateQrCodeFormProps) {
  const { execute, isExecuting } = useAction(generateQrCodes, {
    onSuccess: () => {
      toast.success('QR codes generated successfully')
      form.reset()
      onSuccess?.()
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const form = useForm<QrCodeFormValues>({
    resolver: zodResolver(qrCodeSchema) as any,
    defaultValues: {
      quantity: 1,
      categoryIds: [],
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => execute({ eventId, ...values }))} className="space-y-6">
        <GenerateQrCodeFormFields categories={categories} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting ? 'Generating...' : 'Generate QR Codes'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
