'use client'

import { useQueryState } from 'nuqs'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function QrCodesFilters() {
  const [status, setStatus] = useQueryState('status', {
    shallow: false,
    scroll: true,
  })

  const [sortBy, setSortBy] = useQueryState('sortBy', {
    shallow: false,
    scroll: true,
  })

  return (
    <div className="flex gap-4">
      <Select value={status || 'all'} onValueChange={(value) => setStatus(value === 'all' ? null : value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="SCANNED">Scanned</SelectItem>
          <SelectItem value="EXPIRED">Expired</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy || 'updatedAt'} onValueChange={(value) => setSortBy(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="updatedAt">Recently updated</SelectItem>
          <SelectItem value="createdAt">Recently created</SelectItem>
          <SelectItem value="name">Name (A-Z)</SelectItem>
          <SelectItem value="unnamed">Unnamed first</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
