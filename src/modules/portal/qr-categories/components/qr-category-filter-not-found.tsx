import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from '@/i18n/navigation'

export const QrCategoryFilterNotFound = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>No Results</CardTitle>
        <CardDescription>No QR categories match your search criteria.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Search className="text-muted-foreground/50 h-12 w-12" />
          <h3 className="mt-4 text-lg font-medium">No matching QR categories found</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <Button asChild className="mt-4">
            <Link href="/qr-categories">Clear Filters</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
