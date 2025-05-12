import { z } from 'zod'

export const qrCodeScanResultSchema = z.object({
  token: z.string(),
  eventId: z.string(),
})

export type QrCodeScanResult = z.infer<typeof qrCodeScanResultSchema>
