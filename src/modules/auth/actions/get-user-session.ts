'use server'

import { authActionClient } from '@/lib/safe-action'

export const getUserSessionAction = authActionClient
  .metadata({ permission: 'none' })
  .action(async ({ ctx }) => {
    return ctx.session.user
  })
