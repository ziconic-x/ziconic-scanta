import { TicketIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 text-gray-200">
              <TicketIcon className="h-full w-full" />
            </div>
          </div>
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-900">404</h1>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Content Not Found</h2>
          <p className="text-gray-600">
            Oops! The content you're looking for seems to have been misplaced or has expired.
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
