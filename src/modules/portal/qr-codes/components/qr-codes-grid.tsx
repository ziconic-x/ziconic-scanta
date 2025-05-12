import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { QrCategories } from '../queries/get-qr-categories-for-generator'
import { QrCodes } from '../queries/get-qr-codes'
import { QrCodeStatusBadge } from './qr-code-status-badge'
import { QrCodesDropdown } from './qr-codes-dropdown'

interface QrCodesGridProps {
  qrCodes: QrCodes
  categories: QrCategories
}

export function QrCodesGrid({ qrCodes, categories }: QrCodesGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {qrCodes.map((qrCode) => (
        <Card
          key={qrCode.id}
          className={cn(
            'overflow-hidden',
            qrCode.status !== 'REJECTED' &&
              !qrCode.expiresAt && {
                'border-warning border-2': !qrCode.name,
                'border-0': qrCode.name,
              },
          )}
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">{qrCode.name || 'Ziconic QR Code'}</CardTitle>
              <CardDescription>{qrCode.identifier || 'No identifier'}</CardDescription>
            </div>
            <QrCodesDropdown
              qrCodeId={qrCode.id}
              qrCodeImage={qrCode.qrCodeBase64}
              qrCodeSecuredToken={qrCode.securedToken}
              qrCodeFormValues={{
                name: qrCode.name || '',
                identifier: qrCode.identifier || '',
                categoryIds: qrCode.categories.map((category) => category.id),
                isRejected: qrCode.status === 'REJECTED',
              }}
              categories={categories}
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {qrCode.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
            <QrCodeStatusBadge status={qrCode.status} expiresAt={qrCode.expiresAt} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
