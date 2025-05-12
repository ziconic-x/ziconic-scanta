'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { RecentScansPromise } from '../../queries/get-recent-scans'
import { NoRecentScans } from './no-recent-scans'
import { ScannerCamera } from './scanner-camera'
import { ScannerManual } from './scanner-manual'
import { ScannerRecentScansView } from './scanner-recent-scans-view'

export function ScannerView({
  eventId,
  recentScansPromise,
}: {
  eventId: string
  recentScansPromise: RecentScansPromise
}) {
  const { scans } = use(recentScansPromise)

  return (
    <>
      <div className="mb-6">
        <Link
          href="/scanner"
          className="text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scanner
        </Link>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">QR Code Scanner</h1>
            <p className="text-muted-foreground">
              Scan QR codes to validate tickets and manage event access. You can use the camera scanner or
              manually enter the code.
            </p>
          </div>
        </div>
      </div>
      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="w-fit">
          <TabsTrigger value="camera">Camera Scanner</TabsTrigger>
          <TabsTrigger disabled value="manual">
            Manual Entry
          </TabsTrigger>
        </TabsList>
        <TabsContent value="camera" className="mt-6">
          <div className="mx-auto grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ScannerCamera eventId={eventId} />
            <div className="col-span-1 lg:col-span-2">
              {scans.length > 0 ? <ScannerRecentScansView scans={scans} /> : <NoRecentScans />}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="manual" className="mt-6">
          <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <ScannerManual />
            {scans.length > 0 ? <ScannerRecentScansView scans={scans} /> : <NoRecentScans />}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
