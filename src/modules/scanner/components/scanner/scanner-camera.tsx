import { Scanner } from '@yudiel/react-qr-scanner'
import { Loader2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { validateQrCode } from '../../actions/validate-qr-code'
import { qrCodeScanResultSchema } from '../../schemas/qr-code-scan-result-schema'
import { ScannerResult } from './scanner-result'

export const ScannerCamera = ({ eventId }: { eventId: string }) => {
  const {
    execute,
    isExecuting,
    result: { data },
    // reset,
  } = useAction(validateQrCode, {
    onSuccess: () => {
      toast.success('QR code validated successfully')
    },
    onError: ({ error }) => {
      toast.error(error.serverError || 'Failed to validate QR code')
    },
  })

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
        <CardDescription>Point your camera at a QR code to scan and validate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted relative overflow-hidden border">
          {isExecuting && (
            <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          )}
          <Scanner
            allowMultiple={false}
            onScan={async (scanResult) => {
              const result = scanResult[0]

              if (result.rawValue) {
                try {
                  const parsedResult = qrCodeScanResultSchema.parse(JSON.parse(result.rawValue))

                  if (eventId !== parsedResult.eventId) {
                    toast.error('Invalid QR code')
                    return
                  }

                  await execute({ token: parsedResult.token, eventId: parsedResult.eventId })
                } catch (error) {
                  toast.error('Invalid QR code')
                }
              }
            }}
            onError={() => {
              toast.error('Error accessing camera')
            }}
            constraints={{ facingMode: 'environment' }}
            classNames={{ container: 'h-full w-full' }}
          />
        </div>

        {data && <ScannerResult qrCode={data?.currentQrCode} />}
      </CardContent>
    </Card>
  )
}
