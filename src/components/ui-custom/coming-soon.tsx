import { cn } from '@/lib/utils'

type ComingSoonProps = {
  children: React.ReactNode
  className?: string
}

export const ComingSoon = ({ children, className }: ComingSoonProps) => {
  return (
    <div className="relative">
      <div
        className={cn(
          'bg-background/80 pointer-events-none absolute inset-0 z-10 flex justify-center backdrop-blur-sm',
          className,
        )}
      >
        {/* / Translations not needed, it's coming soon page */}
        <div className="mx-4 mt-40 h-min rounded-lg border p-8 text-center shadow-lg">
          <h2 className="mb-2 text-2xl font-bold">Coming Soon</h2>
          <p className="text-muted-foreground">This feature is currently under development</p>
        </div>
      </div>
      {children}
    </div>
  )
}
