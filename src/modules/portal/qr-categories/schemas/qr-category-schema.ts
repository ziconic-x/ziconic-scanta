import { z } from 'zod'

export const qrCategorySchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be at most 50 characters'),
    description: z.string().max(100, 'Description must be at most 100 characters').optional(),
    isPublic: z.boolean(),
    organizationId: z.string().optional(),
  })
  .refine((data) => data.isPublic || !!data.organizationId, {
    message: 'Either make the category public or select an organization',
    path: ['organizationId'],
  })

export const qrCategoryIdSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
})

export type QrCategoryFormValues = z.infer<typeof qrCategorySchema>
