import { z } from 'zod'

export const validateQrCodeSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  eventId: z.string().min(1, 'Event ID is required'),
})

export type ValidateQrCodeInput = z.infer<typeof validateQrCodeSchema>
