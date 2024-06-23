export function countWithinString(source: string, search: RegExp): number {
  const matches = source.match(search) ?? [];
  return matches.length;
}
