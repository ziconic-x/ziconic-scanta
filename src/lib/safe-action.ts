import { auth, clerkClient } from '@clerk/nextjs/server'
import { createSafeActionClient } from 'next-safe-action'
import { values } from 'remeda'
import { z } from 'zod'
import { fromError } from 'zod-validation-error'

import { permissions } from '@/modules/auth/permissions'

import { getUserSession } from './get-user-session'
import { tuplifyUnion } from './tuplify-union'

export class ActionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ActionError'
  }
}

const DEFAULT_SERVER_ERROR = 'Something went wrong while executing the operation.'

// Use this to build a server action that doesn't require user authentication.
export const nonAuthActionClient = createSafeActionClient({
  handleServerError(error) {
    console.error('[Server action] Action error:', error.message)
    if (process.env.NODE_ENV === 'development') {
      return error.message || DEFAULT_SERVER_ERROR
    }
    if (error instanceof ActionError) {
      return error.message
    }
    return DEFAULT_SERVER_ERROR
  },
}).use(async ({ next, clientInput, metadata, bindArgsClientInputs }) => {
  console.log('[Server action] Action input:', clientInput)
  console.log('[Server action] Action input (bind):', bindArgsClientInputs)
  console.log('[Server action] Action metadata:', metadata)

  const result = await next({ ctx: undefined })

  console.log(
    '[Server action] Action result:',
    process.env.NODE_ENV === 'development' ? JSON.stringify(result, null, 2) : result,
  )

  return result
})

const validSessionUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  imageUrl: z.string().nullable(),
  permissions: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
    }),
  ),
})

export type ValidSessionUser = z.infer<typeof validSessionUserSchema>

const validSessionSchema = z.object({
  user: validSessionUserSchema,
})

export const authActionClient = createSafeActionClient({
  defineMetadataSchema() {
    const permissionValues = tuplifyUnion(values(permissions))

    const permissionSchema = z.enum(permissionValues)

    const singlePermissionSchema = z.enum([...permissionValues, 'none'])

    return z.object({
      permission: singlePermissionSchema.or(z.array(permissionSchema)),
    })
  },
  handleServerError(error) {
    console.log('Error unauthenticated', error)
    console.error('[Server action] Action error:', error.message)
    if (process.env.NODE_ENV === 'development') {
      return error.message || DEFAULT_SERVER_ERROR
    }
    if (error instanceof ActionError) {
      return error.message
    }
    return DEFAULT_SERVER_ERROR
  },
})
  .use(async ({ metadata, next }) => {
    const session = await getUserSession()

    if (session === null) {
      throw new ActionError('The user is unauthenticated.')
    }

    const ck = await clerkClient()
    const { sessionId } = await auth()

    if (metadata.permission !== 'none') {
      if (typeof metadata.permission === 'string') {
        const hasPermission = session.roles.some((role) =>
          role.permissions.some((p) => p.name === metadata.permission),
        )
        if (!hasPermission) {
          if (sessionId) {
            await ck.sessions.revokeSession(sessionId)
          }
          throw new ActionError(`The user is missing a required permission: "${metadata.permission}".`)
        }
      } else {
        const hasAnyPermission = metadata.permission.some((permission) =>
          session.roles.some((role) => role.permissions.some((p) => p.name === permission)),
        )
        if (!hasAnyPermission) {
          if (sessionId) {
            await ck.sessions.revokeSession(sessionId)
          }
          throw new ActionError(
            `The user is missing one of the required permissions: "${metadata.permission.join(', ')}".`,
          )
        }
      }
    }

    const sessionUser = {
      id: session.id,
      name: session.name,
      email: session.email,
      imageUrl: session.imageUrl,
      permissions: session.roles.flatMap((role) => role.permissions),
    }

    const validSession = validSessionSchema.safeParse({ user: sessionUser })
    if (!validSession.success) {
      console.error('The session is malformed.', {
        errors: fromError(validSession.error).toString(),
      })

      if (sessionId) {
        await ck.sessions.revokeSession(sessionId)
      }
      throw new ActionError('The session is malformed.')
    }

    return next({
      ctx: {
        session: {
          user: sessionUser,
        },
      },
    })
  })
  .use(async ({ next, clientInput, metadata, bindArgsClientInputs }) => {
    console.log('[Server action] Action input:', clientInput)
    console.log('[Server action] Action input (bind):', bindArgsClientInputs)
    console.log('[Server action] Action metadata:', metadata)

    const result = await next({ ctx: undefined })

    console.log(
      '[Server action] Action result:',
      process.env.NODE_ENV === 'development' ? JSON.stringify(result, null, 2) : result,
    )

    return result
  })
