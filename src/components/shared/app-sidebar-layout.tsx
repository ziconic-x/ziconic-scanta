'use client'

import { Menu, QrCode } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'

import { useMediaQuery } from '@/lib/hooks/use-media-query'
import NoSSR from '@/lib/no-ssr'

import { ModeToggle } from '@/components/ui-custom/mode-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { AppSidebar } from './app-sidebar'

export const AppSidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (isDesktop) {
    return (
      <NoSSR>
        <div className="flex min-h-screen flex-col">
          <div className="grid h-screen lg:grid-cols-[230.5px_1fr]">
            <div className="hidden h-full border-r lg:block">
              <AppSidebar setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </NoSSR>
    )
  }

  return (
    <NoSSR>
      <header className="bg-background flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent noClose side="left" className="p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <AppSidebar setIsSidebarOpen={setIsSidebarOpen} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <QrCode className="h-6 w-6" />
            <span>Ziconic</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </header>
      <main className="">{children}</main>
    </NoSSR>
  )
}
