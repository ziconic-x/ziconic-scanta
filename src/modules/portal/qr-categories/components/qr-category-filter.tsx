'use client'

import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type QrCategoryFilterProps = {
  options: { label: string; value: string }[]
}

export const QrCategoryFilter = ({ options }: QrCategoryFilterProps) => {
  const [organizationId, setOrganizationId] = useQueryState('organizationId', {
    shallow: false,
    scroll: true,
  })

  const [visibility, setVisibility] = useQueryState('visibility', {
    shallow: false,
    scroll: true,
  })

  const selectedOrganization = options.find((org) => org.value === organizationId)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {selectedOrganization && (
        <Badge
          variant="outline"
          className="flex items-center justify-between gap-4 border-dashed px-2 py-2.5"
        >
          <span className="truncate">{selectedOrganization.label}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOrganizationId(null)}
            className="hover:bg-muted ml-1 h-4 w-4 rounded-full p-1"
            aria-label="Remove organization filter"
          >
            <X className="h-2 w-2" />
          </Button>
        </Badge>
      )}

      {visibility && (
        <Badge
          variant="outline"
          className="flex items-center justify-between gap-4 border-dashed px-2 py-2.5"
        >
          <span className="truncate">
            {visibility === 'public'
              ? 'Public'
              : visibility === 'restricted'
                ? 'Restricted'
                : 'All visibility'}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVisibility(null)}
            className="hover:bg-muted ml-1 h-4 w-4 rounded-full p-1"
            aria-label="Remove visibility filter"
          >
            <X className="h-2 w-2" />
          </Button>
        </Badge>
      )}

      {!selectedOrganization && !visibility && (
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={organizationId || 'all'}
            onValueChange={(value: string) => {
              setOrganizationId(value || null)
            }}
          >
            <SelectTrigger className="w-[200px] border-dashed">
              <SelectValue placeholder="Filter by organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All organizations</SelectItem>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={visibility || 'all'}
            onValueChange={(value: string) => {
              setVisibility(value || null)
            }}
          >
            <SelectTrigger className="w-[200px] border-dashed">
              <SelectValue placeholder="Filter by visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All visibility</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {visibility === 'organization' && !selectedOrganization && (
        <Select
          value={organizationId || 'all'}
          onValueChange={(value: string) => {
            setOrganizationId(value || null)
          }}
        >
          <SelectTrigger className="w-[200px] border-dashed">
            <SelectValue placeholder="Select organization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All organizations</SelectItem>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}
