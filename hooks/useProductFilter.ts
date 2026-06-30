'use client'

import { useMemo } from 'react'

export type FilterPredicate<T> = (item: T) => boolean
export type SortComparator<T> = (a: T, b: T) => number

interface UseProductFilterOptions<T> {
  items: T[]
  // Strategy Pattern: each predicate is a composable strategy; caller memoizes this array.
  predicates: ReadonlyArray<FilterPredicate<T>>
  comparator?: SortComparator<T>
}

export function useProductFilter<T>({
  items,
  predicates,
  comparator,
}: UseProductFilterOptions<T>): { filtered: T[] } {
  const filtered = useMemo(() => {
    let result = predicates.length > 0
      ? items.filter((item) => predicates.every((p) => p(item)))
      : items
    if (comparator) result = [...result].sort(comparator)
    return result
  }, [items, predicates, comparator])

  return { filtered }
}
