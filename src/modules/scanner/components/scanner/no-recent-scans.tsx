import { QrCode } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function NoRecentScans() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>History of recently scanned QR codes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[200px] flex-col items-center justify-center space-y-4 rounded-md border border-dashed p-8 text-center">
          <div className="text-muted-foreground/20 h-16 w-16">
            <QrCode className="h-full w-full" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No Recent Scans</h3>
            <p className="text-muted-foreground text-sm">Start scanning QR codes to see them appear here.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
