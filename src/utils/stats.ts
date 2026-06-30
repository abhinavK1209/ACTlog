import type { EnglishEntry, ReadingEntry } from '../types';

function mode<T extends string>(arr: T[]): T | null {
  if (arr.length === 0) return null;
  const counts: Record<string, number> = {};
  for (const v of arr) counts[v] = (counts[v] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as T;
}

export function englishStats(entries: EnglishEntry[]) {
  const byType: Record<string, number> = {};
  const byMiss: Record<string, number> = {};
  let unreviewed = 0;
  for (const e of entries) {
    byType[e.questionType] = (byType[e.questionType] || 0) + 1;
    byMiss[e.missType] = (byMiss[e.missType] || 0) + 1;
    if (e.reviewed === 'no') unreviewed++;
  }
  return {
    total: entries.length,
    byType,
    byMiss,
    unreviewed,
    mostCommonType: mode(entries.map((e) => e.questionType)),
  };
}

export function readingStats(entries: ReadingEntry[]) {
  const byType: Record<string, number> = {};
  const byMiss: Record<string, number> = {};
  let unreviewed = 0;
  for (const e of entries) {
    byType[e.questionType] = (byType[e.questionType] || 0) + 1;
    byMiss[e.missType] = (byMiss[e.missType] || 0) + 1;
    if (e.reviewed === 'no') unreviewed++;
  }
  return {
    total: entries.length,
    byType,
    byMiss,
    unreviewed,
    mostCommonType: mode(entries.map((e) => e.questionType)),
  };
}
