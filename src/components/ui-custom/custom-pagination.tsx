'use client'

import { usePagination } from '@/lib/hooks/use-pagination'
import { cn } from '@/lib/utils'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export function getPaginationItems(currentPage: number, totalPages: number) {
  const paginationItems = []

  paginationItems.push(1)
  if (currentPage > 3) {
    paginationItems.push('elipsis')
  }

  for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
    paginationItems.push(i)
  }

  if (currentPage < totalPages - 2) {
    paginationItems.push('elipsis')
  }

  if (totalPages > 1) paginationItems.push(totalPages)
  return paginationItems
}

type CustomPaginationProps = {
  total: number
  pageSize?: number
}

export default function CustomPagination({ total, pageSize }: CustomPaginationProps) {
  const [pagination, setPagination] = usePagination({
    shallow: false,
    scroll: true,
  })

  const totalPages = Math.ceil(total / (pageSize ?? pagination.pageSize))
  const currentPage = pagination.pageIndex + 1
  const paginationItems = getPaginationItems(currentPage, totalPages)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          onClick={() => {
            if (currentPage !== 1) {
              setPagination({ pageIndex: pagination.pageIndex - 1 })
            }
          }}
          aria-disabled={currentPage === 1}
        >
          <PaginationPrevious
            aria-disabled={currentPage === 1}
            className={cn(
              'h-9 cursor-pointer items-center',
              currentPage === 1 ? 'hover:!bg-background cursor-not-allowed opacity-60' : '',
            )}
          />
        </PaginationItem>

        {paginationItems.map((item) => (
          <PaginationItem key={item} className="cursor-pointer">
            {item === 'elipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === item}
                onClick={() => {
                  if (item !== currentPage) {
                    setPagination({ pageIndex: (item as number) - 1 })
                  }
                }}
                aria-disabled={currentPage === item}
                className={cn('items-center justify-center', currentPage === item ? 'border-border' : '')}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem
          onClick={() => {
            if (totalPages > currentPage) {
              setPagination({ pageIndex: pagination.pageIndex + 1 })
            }
          }}
          aria-disabled={currentPage === totalPages}
        >
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            className={cn(
              'h-9 cursor-pointer items-center',
              currentPage === totalPages ? 'hover:!bg-background cursor-not-allowed opacity-60' : '',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
