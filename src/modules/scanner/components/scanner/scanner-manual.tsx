import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { ScannerResult } from './scanner-result'

export const ScannerManual = () => {
  const [token, setToken] = useState('')
  const [scanResult, setScanResult] = useState(false)
  const [scannedQRCode, setScannedQRCode] = useState<any>(null)

  // const { execute: executeValidateQrCode } = useAction(validateQrCode, {
  //   onSuccess: (data) => {
  //     if (!data?.data) return

  //     setScannedQRCode(data.data.qrCode)
  //     setScanResult(true)
  //     toast.success('QR code validated successfully')
  //   },
  //   onError: (error) => {
  //     toast.error('Failed to validate QR code')
  //     console.error('Error validating QR code:', error)
  //   },
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (token.trim()) {
      // await executeValidateQrCode({ token: token.trim() })
    }
  }

  const handleReset = () => {
    setToken('')
    setScanResult(false)
    setScannedQRCode(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Entry</CardTitle>
        <CardDescription>Enter a secure token manually</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!scanResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter secure token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Validate Token
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="mt-2 text-xl font-bold">Token Validated</h3>
            <p className="text-muted-foreground text-center">Successfully validated token</p>
            <Button onClick={handleReset} className="mt-4">
              Validate Another
            </Button>
          </div>
        )}

        {scannedQRCode && <ScannerResult qrCode={scannedQRCode} />}
      </CardContent>
    </Card>
  )
}
