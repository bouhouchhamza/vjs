export function sortByKey<T>(items: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...items].sort((a, b) => {
    const left = String(a[key]).toLowerCase();
    const right = String(b[key]).toLowerCase();
    const result = left.localeCompare(right, undefined, { numeric: true });
    return direction === 'asc' ? result : -result;
  });
}
