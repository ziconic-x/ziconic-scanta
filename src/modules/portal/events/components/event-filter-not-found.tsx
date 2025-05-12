import { FilterX } from 'lucide-react'

export const EventFilterNotFound = () => {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-muted-foreground/20 h-32 w-32">
              <FilterX className="h-full w-full" />
            </div>
          </div>
          <div className="relative">
            <h3 className="text-foreground text-4xl font-bold">0</h3>
          </div>
        </div>
        <h3 className="mt-4 text-xl font-semibold">No Matching Events</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    </div>
  )
}
