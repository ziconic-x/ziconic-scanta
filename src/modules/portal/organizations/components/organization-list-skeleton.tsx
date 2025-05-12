import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const OrganizationListSkeleton = () => {
  // Create an array of 6 items to show in the grid (2x3 grid)
  const skeletonItems = Array(6).fill(null)

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skeletonItems.map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                {/* Title skeleton */}
                <div className="bg-muted h-6 w-32 animate-pulse rounded-md" />
                {/* Description skeleton */}
                <div className="bg-muted h-4 w-48 animate-pulse rounded-md" />
              </div>
              {/* Dropdown skeleton */}
              <div className="bg-muted h-8 w-8 animate-pulse rounded-md" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                {/* Icon skeleton */}
                <div className="bg-muted h-8 w-8 animate-pulse rounded-md" />
                <div className="flex-1 space-y-1">
                  {/* QR codes count skeleton */}
                  <div className="bg-muted h-4 w-36 animate-pulse rounded-md" />
                  {/* Events count skeleton */}
                  <div className="bg-muted h-4 w-24 animate-pulse rounded-md" />
                </div>
                {/* Button skeleton */}
                <div className="bg-muted h-8 w-16 animate-pulse rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
