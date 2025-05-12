import { z } from 'zod'

export const eventSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be at most 50 characters'),
  description: z.string().max(100, 'Description must be at most 100 characters').optional(),
  startDate: z.date(),
  address: z.string().min(1, 'Address is required'),
})

export type EventFormValues = z.infer<typeof eventSchema>
export const eventIdSchema = z.object({
  id: z.string().min(1, 'Event ID is required'),
})

export type EventIdInput = z.infer<typeof eventIdSchema>

export const cancelEventSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
  organizationId: z.string().min(1, 'Organization ID is required'),
})

export const finishEventSchema = z.object({
  eventId: z.string(),
  organizationId: z.string(),
})
