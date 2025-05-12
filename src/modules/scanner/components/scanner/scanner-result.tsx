import { format } from 'date-fns'
import { CheckCircle, XCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { QrCodeStatusBadge } from '@/modules/portal/qr-codes/components/qr-code-status-badge'

type ScannerResultProps = {
  qrCode: {
    id: string
    status: 'ACTIVE' | 'EXPIRED' | 'REJECTED' | 'SCANNED'
    expiresAt: Date
    securedToken: string
    event: {
      name: string
      startDate: Date
    }
    name?: string | null
    identifier?: string | null
  }
}

export const ScannerResult = ({ qrCode }: ScannerResultProps) => {
  const isExpired = new Date(qrCode.expiresAt) < new Date()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{qrCode.name || 'Unnamed QR Code'}</CardTitle>
            <CardDescription>
              Event: {qrCode.event.name} • {format(new Date(qrCode.event.startDate), 'PPP')}
            </CardDescription>
          </div>
          <QrCodeStatusBadge status={qrCode.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Identifier</span>
            <span className="text-muted-foreground text-sm">{qrCode.identifier || 'N/A'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Expires</span>
            <span className="text-muted-foreground text-sm">
              {format(new Date(qrCode.expiresAt), 'PPP p')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Secure Token</span>
            <span className="text-muted-foreground font-mono text-sm">{qrCode.securedToken}</span>
          </div>
        </div>

        <Alert className={isExpired ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-green-500/10'}>
          {isExpired ? (
            <XCircle className="h-4 w-4 text-red-500" />
          ) : (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          <AlertTitle>{isExpired ? 'Expired' : 'Valid'}</AlertTitle>
          <AlertDescription>
            {isExpired
              ? 'This QR code has expired and is no longer valid'
              : 'This QR code is valid and can be used'}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
