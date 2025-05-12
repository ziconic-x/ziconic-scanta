import QRCode from 'qrcode'

interface QRCodeOptions {
  width?: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
}

export async function generateQRCodeBase64(data: string, options: QRCodeOptions = {}): Promise<string> {
  const defaultOptions = {
    width: 300,
    errorCorrectionLevel: 'H' as const,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  }

  const mergedOptions = { ...defaultOptions, ...options }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, mergedOptions)
    return qrCodeDataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}
