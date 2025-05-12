'use client'

import { useUserSession } from '@/lib/hooks/use-user-session'

import SignOutButton from '@/modules/shared/signout-button'

export const Dashboard = () => {
  const { userSession, isExecuting } = useUserSession()

  if (isExecuting) {
    return null
  }

  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <h1>my session</h1>
      {JSON.stringify(userSession)}
      <SignOutButton />
    </div>
  )
}
