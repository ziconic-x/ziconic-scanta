import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type AlertVariant = 'default' | 'destructive' | 'warning' | 'success'

interface AnimatedAlertProps {
  variant?: AlertVariant
  title?: ReactNode
  description?: ReactNode
  className?: string
  children?: ReactNode
  showIcon?: boolean
}

const alertVariantStyles: Record<AlertVariant, string> = {
  default:
    'bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400',
  destructive:
    'bg-red-50/50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 [&>svg]:text-red-600 dark:[&>svg]:text-red-400',
  warning:
    'bg-yellow-50/50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400',
  success:
    'bg-green-50/50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-400',
}

const alertIcons = {
  default: Info,
  destructive: XCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
} as const

export function AnimatedAlert({
  variant = 'default',
  title,
  description,
  className,
  children,
  showIcon = true,
}: AnimatedAlertProps) {
  const IconComponent = alertIcons[variant as keyof typeof alertIcons]

  return (
    <Alert
      className={cn(
        'animate-in fade-in-0 slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 transition-all duration-500 ease-out',
        'relative overflow-hidden rounded-lg border shadow-sm',
        alertVariantStyles[variant],
        className,
      )}
    >
      {showIcon && <IconComponent className="h-5 w-5" />}
      <div className="w-full">
        {title && <AlertTitle className="mb-1 font-medium">{title}</AlertTitle>}
        {description && <AlertDescription className="text-sm opacity-90">{description}</AlertDescription>}
        {children}
      </div>
    </Alert>
  )
}
