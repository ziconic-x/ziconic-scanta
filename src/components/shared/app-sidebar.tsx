'use client'

import { Building2, CalendarDays, Home, QrCode, Settings, Tags, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useUserSession } from '@/lib/hooks/use-user-session'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import SignOutButton from '@/modules/shared/signout-button'

import { ModeToggle } from '../ui-custom/mode-toggle'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Organizations', href: '/organizations', icon: Building2 },
  { name: 'Events', href: '/events', icon: CalendarDays },
  { name: 'QR Categories', href: '/qr-categories', icon: Tags },
  { name: 'Scanner', href: '/scanner', icon: QrCode },
  { name: 'Settings', href: '/settings', icon: Settings },
]

type AppSidebarProps = {
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}

export const AppSidebar = ({ setIsSidebarOpen }: AppSidebarProps) => {
  const pathname = usePathname()

  const { userSession } = useUserSession()

  return (
    <div className="bg-background flex h-screen flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <div className="flex w-full items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <QrCode className="h-6 w-6" />
            <span>Ziconic</span>
          </Link>
          <ModeToggle />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 lg:px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                pathname === item.href ? 'bg-accent text-accent-foreground' : 'transparent',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {userSession && (
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={userSession.imageUrl ?? ''} alt="User" />
              <AvatarFallback>{userSession.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{userSession.name}</span>
              <span className="text-muted-foreground text-xs">{userSession.email}</span>
            </div>
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  )
}
