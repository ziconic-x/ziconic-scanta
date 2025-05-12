import { format } from 'date-fns'
import { CheckCircle, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { RecentScans as TRecentScans } from '../../queries/get-recent-scans'

type ScannerRecentScansViewProps = {
  scans: TRecentScans
}

export const ScannerRecentScansView = ({ scans }: ScannerRecentScansViewProps) => {
  if (scans.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Scans</CardTitle>
        <CardDescription>History of recently scanned QR codes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="max-h-[calc(5*5.4rem)] space-y-4 overflow-y-auto pr-2">
          {scans.map((scan) => (
            <div key={scan.id} className="flex items-center space-x-4 rounded-md border p-4">
              {scan.qrCode.status === 'SCANNED' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {scan.qrCode.name || scan.qrCode.identifier || 'Unnamed QR Code'}
                  </p>
                  <Badge variant="outline" className="ml-2">
                    {scan.qrCode.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">{scan.qrCode.event.name}</p>
                  <p className="text-muted-foreground text-sm">{format(new Date(scan.scannedAt), 'PPp')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
