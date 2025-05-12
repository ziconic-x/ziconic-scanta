import { z } from 'zod'

export const organizationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be at most 50 characters'),
  description: z.string().max(100, 'Description must be at most 100 characters').optional(),
})

export type OrganizationFormValues = z.infer<typeof organizationSchema>
export const organizationIdSchema = z.object({
  organizationId: z.string().min(1, 'Organization ID is required'),
})

export type OrganizationIdInput = z.infer<typeof organizationIdSchema>
