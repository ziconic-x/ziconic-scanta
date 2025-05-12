import { z } from 'zod'

export const qrCodeSchema = z.object({
  categoryIds: z.array(z.string()).min(1, 'At least one category is required'),
  quantity: z.coerce
    .number()
    .min(1, 'Quantity must be at least 1')
    .max(50, 'Quantity must be at most 50')
    .default(1),
})

export type QrCodeFormValues = z.infer<typeof qrCodeSchema>

export const eventIdSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
})

export const validateQrCodeSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export const qrCodeEditSchema = z.object({
  name: z.string().optional(),
  identifier: z.string().optional(),
  categoryIds: z.array(z.string()),
  isRejected: z.boolean().optional(),
})

export type QrCodeEditFormValues = z.infer<typeof qrCodeEditSchema>

export type EventId = z.infer<typeof eventIdSchema>

export const qrCodeIdSchema = z.object({
  id: z.string(),
})

export type QrCodeId = z.infer<typeof qrCodeIdSchema>
