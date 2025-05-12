'use client'

import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function SignOutButton() {
  const { signOut } = useClerk()

  return (
    <Button onClick={() => signOut()} variant="ghost" size="icon">
      <LogOut className="h-4 w-4" />
    </Button>
  )
}
