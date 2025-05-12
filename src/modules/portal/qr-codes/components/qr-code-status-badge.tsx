import { differenceInDays, differenceInHours } from 'date-fns'

import { Badge } from '@/components/ui/badge'

import { QrCodeStatus } from '@/generated/prisma/client'

interface QrCodeStatusBadgeProps {
  status: QrCodeStatus
  expiresAt?: Date | null
}

export function QrCodeStatusBadge({ status, expiresAt }: QrCodeStatusBadgeProps) {
  const getStatusVariant = (status: QrCodeStatus) => {
    switch (status) {
      case 'ACTIVE':
        return 'success-outline'
      case 'SCANNED':
        return 'success'
      case 'EXPIRED':
        return 'destructive-outline'
      case 'REJECTED':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status: QrCodeStatus, expiresAt?: Date | null) => {
    if (status === 'ACTIVE' && expiresAt) {
      const daysUntilExpiration = differenceInHours(new Date(expiresAt), new Date())
      if (daysUntilExpiration <= 0) {
        return 'EXPIRED'
      }
      return `ACTIVE (${daysUntilExpiration}h)`
    }
    return status
  }

  const finalStatus =
    status === 'ACTIVE' && expiresAt && differenceInDays(new Date(expiresAt), new Date()) <= 0
      ? 'EXPIRED'
      : status

  return <Badge variant={getStatusVariant(finalStatus)}>{getStatusText(status, expiresAt)}</Badge>
}
