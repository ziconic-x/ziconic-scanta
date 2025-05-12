import { useFormContext } from 'react-hook-form'

import { AlertDescription } from '@/components/ui/alert'
import { AnimatedAlert } from '@/components/ui/animated-alert'

interface FormErrorsProps {
  className?: string
  title?: string
}

export function FormErrors({ className, title = '' }: FormErrorsProps) {
  const {
    formState: { errors },
  } = useFormContext()

  // If there are no errors, don't render anything
  if (Object.keys(errors).length === 0) {
    return null
  }

  // Get all error messages
  const errorMessages = Object.values(errors)
    .map((error) => error?.message)
    .filter(Boolean) as string[]

  return (
    <AnimatedAlert variant="destructive" className={className} title={title}>
      <AlertDescription>
        <ul className="ml-4 list-disc space-y-1.5">
          {errorMessages.map((message, index) => (
            <li key={index} className="text-sm leading-relaxed">
              {message}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </AnimatedAlert>
  )
}
