import type { EnglishEntry, ReadingEntry } from '../types';

const ENGLISH_KEY = 'act_english_log';
const READING_KEY = 'act_reading_log';

export function loadEnglish(): EnglishEntry[] {
  try {
    return JSON.parse(localStorage.getItem(ENGLISH_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveEnglish(entries: EnglishEntry[]): void {
  localStorage.setItem(ENGLISH_KEY, JSON.stringify(entries));
}

export function loadReading(): ReadingEntry[] {
  try {
    return JSON.parse(localStorage.getItem(READING_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveReading(entries: ReadingEntry[]): void {
  localStorage.setItem(READING_KEY, JSON.stringify(entries));
}

export function exportCSV(entries: object[], filename: string): void {
  if (entries.length === 0) return;
  const headers = Object.keys(entries[0]);
  const rows = entries.map((e) =>
    headers.map((h) => `"${String((e as Record<string, unknown>)[h] ?? '').replace(/"/g, '""')}"`).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  download(csv, filename, 'text/csv');
}

export function exportJSON(english: EnglishEntry[], reading: ReadingEntry[]): void {
  const json = JSON.stringify({ english, reading }, null, 2);
  download(json, 'act_error_logs.json', 'application/json');
}

export function importJSON(
  file: File,
  onLoad: (english: EnglishEntry[], reading: ReadingEntry[]) => void
): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      onLoad(data.english || [], data.reading || []);
    } catch {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function download(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
