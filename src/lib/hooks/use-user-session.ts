import { useClerk } from '@clerk/nextjs'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'

import { getUserSessionAction } from '@/modules/auth/actions/get-user-session'

import { ValidSessionUser } from '../safe-action'

export const useUserSession = () => {
  const { signOut } = useClerk()

  const [isExecuting, setIsExecuting] = useState(true)
  const [userSession, setUserSession] = useState<ValidSessionUser | null>(null)

  const { execute } = useAction(getUserSessionAction, {
    onSuccess: ({ data }) => {
      setUserSession((data as any) ?? null)
      setIsExecuting(false)
    },
    onError: () => {
      setUserSession(null)
      setIsExecuting(false)
      signOut()
    },
  })

  useEffect(() => {
    execute()
  }, [execute])

  return { userSession, isExecuting }
}
