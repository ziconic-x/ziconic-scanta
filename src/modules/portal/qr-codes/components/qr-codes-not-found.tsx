import { QrCode } from 'lucide-react'

export const QrCodesNotFound = () => {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground/20 h-32 w-32">
              <QrCode className="h-full w-full" />
            </div>
          </div>
          <div className="relative">
            <h3 className="text-foreground text-4xl font-bold">0</h3>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold">No QR Codes Found</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Get started by creating your first QR code to manage your events and QR codes.
        </p>
      </div>
    </div>
  )
}
