import { useState, useCallback } from 'react';
import type { EnglishEntry, ReadingEntry } from './types';
import {
  loadEnglish, saveEnglish,
  loadReading, saveReading,
  exportJSON, importJSON,
} from './utils/storage';
import { Dashboard } from './components/Dashboard';
import { EnglishLog } from './components/EnglishLog';
import { ReadingLog } from './components/ReadingLog';

type Tab = 'home' | 'english' | 'reading';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [english, setEnglish] = useState<EnglishEntry[]>(loadEnglish);
  const [reading, setReading] = useState<ReadingEntry[]>(loadReading);

  function updateEnglish(entries: EnglishEntry[]) {
    setEnglish(entries);
    saveEnglish(entries);
  }

  function updateReading(entries: ReadingEntry[]) {
    setReading(entries);
    saveReading(entries);
  }

  const addEnglish = useCallback((e: EnglishEntry) => updateEnglish([...english, e]), [english]);
  const editEnglish = useCallback((e: EnglishEntry) => updateEnglish(english.map((x) => x.id === e.id ? e : x)), [english]);
  const delEnglish = useCallback((id: string) => updateEnglish(english.filter((x) => x.id !== id)), [english]);

  const addReading = useCallback((e: ReadingEntry) => updateReading([...reading, e]), [reading]);
  const editReading = useCallback((e: ReadingEntry) => updateReading(reading.map((x) => x.id === e.id ? e : x)), [reading]);
  const delReading = useCallback((id: string) => updateReading(reading.filter((x) => x.id !== id)), [reading]);

  function handleImport(file: File) {
    importJSON(file, (eng, rd) => {
      updateEnglish(eng);
      updateReading(rd);
      alert(`Imported ${eng.length} English + ${rd.length} Reading entries.`);
    });
  }

  return (
    <div className="app">
      <nav>
        <span className="brand">ACT Error Logs</span>
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>Dashboard</button>
        <button className={tab === 'english' ? 'active' : ''} onClick={() => setTab('english')}>English</button>
        <button className={tab === 'reading' ? 'active' : ''} onClick={() => setTab('reading')}>Reading</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button className="btn btn-sm btn-ghost" onClick={() => exportJSON(english, reading)}>
            Export JSON
          </button>
          <label className="btn btn-sm btn-ghost" style={{ cursor: 'pointer' }}>
            Import JSON
            <input type="file" accept=".json" style={{ display: 'none' }} onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) { handleImport(f); e.target.value = ''; }
            }} />
          </label>
        </div>
      </nav>

      {tab === 'home' && (
        <Dashboard english={english} reading={reading} onNav={setTab} />
      )}
      {tab === 'english' && (
        <EnglishLog entries={english} onAdd={addEnglish} onUpdate={editEnglish} onDelete={delEnglish} />
      )}
      {tab === 'reading' && (
        <ReadingLog entries={reading} onAdd={addReading} onUpdate={editReading} onDelete={delReading} />
      )}
    </div>
  );
}
