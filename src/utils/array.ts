export type SortComparator<T> = (a: T, b: T) => number

export const sort = <T>(comparator: SortComparator<T>, array: T[]) =>
  [...array].sort(comparator)
