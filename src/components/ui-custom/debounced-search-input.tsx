'use client'

import { Search, X } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const DebouncedSearchInput = () => {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    shallow: false,
  })
  const [inputValue, setInputValue] = useState(search)
  const debouncedInputValue = useDebounce(inputValue, 300)

  // Update URL when debounced value changes
  useEffect(() => {
    if (debouncedInputValue !== search) {
      setSearch(debouncedInputValue)
    }
  }, [debouncedInputValue, setSearch, search])

  // Update local state when URL changes
  useEffect(() => {
    setInputValue(search)
  }, [search])

  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-[14px] -translate-y-1/2" size={16} />
      <Input
        type="text"
        placeholder="Search organizations..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="h-10 w-full rounded-md pl-[38px]"
      />
      {inputValue && (
        <X
          onClick={() => setInputValue('')}
          className="absolute top-1/2 right-[14px] z-10 -translate-y-1/2 cursor-pointer"
          size={16}
        />
      )}
    </div>
  )
}
