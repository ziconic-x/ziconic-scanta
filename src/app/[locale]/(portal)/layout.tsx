import type React from 'react'

import { AppSidebarLayout } from '@/components/shared/app-sidebar-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppSidebarLayout>{children}</AppSidebarLayout>
}
