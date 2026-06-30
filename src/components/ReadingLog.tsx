import type { ReadingEntry } from '../types';
import { ReadingEntryForm } from './ReadingEntryForm';
import { ReadingTable } from './ReadingTable';
import { Analytics } from './Analytics';
import { readingStats } from '../utils/stats';
import { exportCSV } from '../utils/storage';

interface Props {
  entries: ReadingEntry[];
  onAdd: (e: ReadingEntry) => void;
  onUpdate: (e: ReadingEntry) => void;
  onDelete: (id: string) => void;
}

export function ReadingLog({ entries, onAdd, onUpdate, onDelete }: Props) {
  const stats = readingStats(entries);

  return (
    <div>
      <div className="section-header">
        <h2>Reading Log</h2>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => exportCSV(entries, 'reading_errors.csv')}
        >
          Export CSV
        </button>
      </div>

      <div className="reminders">
        <h3>Reading Reminders</h3>
        <ul>
          <li>For detail questions, go back to the passage.</li>
          <li>Read 2–3 lines before and after the evidence.</li>
          <li>Avoid answers that are too broad, too extreme, or only half true.</li>
          <li>Do not let one passage steal time.</li>
          <li>For every miss, write where the proof was.</li>
        </ul>
        <div className="main-rule">Main rule: Proof over vibes.</div>
      </div>

      <ReadingEntryForm onAdd={onAdd} />

      <Analytics
        byType={stats.byType}
        byMiss={stats.byMiss}
        total={stats.total}
        unreviewed={stats.unreviewed}
      />

      <ReadingTable entries={entries} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
