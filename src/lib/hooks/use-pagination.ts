import { parseAsInteger, useQueryStates } from 'nuqs'
import type { TransitionStartFunction } from 'react'
import { z } from 'zod'

export const pageSizeOptions = [6, 12, 24] as const
export type PageSizeOption = (typeof pageSizeOptions)[number]

export const defaultPageIndex = 0
export const defaultPageSizeOption = 6

export interface UsePaginationOptions {
  shallow?: boolean
  scroll?: boolean
  startTransition?: TransitionStartFunction
}

export const usePagination = ({
  shallow = true,
  scroll = true,
  startTransition,
}: UsePaginationOptions = {}) => {
  const [pagination, setPagination] = useQueryStates(
    {
      pageIndex: parseAsInteger.withDefault(defaultPageIndex),
      pageSize: parseAsInteger.withDefault(defaultPageSizeOption),
    },
    {
      clearOnDefault: true,
      shallow,
      scroll,
      startTransition,
    },
  )

  const pageIndex = z.number().int().nonnegative().catch(defaultPageIndex).parse(pagination.pageIndex)
  const pageSize = z
    .number()
    .refine((value) => pageSizeOptions.includes(value as PageSizeOption))
    .catch(defaultPageSizeOption)
    .parse(pagination.pageSize)

  return [{ pageIndex, pageSize }, setPagination] as const
}

export interface UsePagination {
  pagination: ReturnType<typeof usePagination>[0]
  setPagination: ReturnType<typeof usePagination>[1]
}
