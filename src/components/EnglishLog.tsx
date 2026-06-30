import type { EnglishEntry } from '../types';
import { EnglishEntryForm } from './EnglishEntryForm';
import { EnglishTable } from './EnglishTable';
import { Analytics } from './Analytics';
import { englishStats } from '../utils/stats';
import { exportCSV } from '../utils/storage';

interface Props {
  entries: EnglishEntry[];
  onAdd: (e: EnglishEntry) => void;
  onUpdate: (e: EnglishEntry) => void;
  onDelete: (id: string) => void;
}

export function EnglishLog({ entries, onAdd, onUpdate, onDelete }: Props) {
  const stats = englishStats(entries);

  return (
    <div>
      <div className="section-header">
        <h2>English Log</h2>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => exportCSV(entries, 'english_errors.csv')}
        >
          Export CSV
        </button>
      </div>

      <div className="reminders">
        <h3>English Reminders</h3>
        <ul>
          <li>For transitions, identify the relationship before choosing.</li>
          <li>For sentence placement, check the sentence before and after.</li>
          <li>For add/delete, ask whether the sentence adds useful, non-repetitive information.</li>
          <li>For purpose questions, match the whole paragraph, not one sentence.</li>
          <li>Since you finish English early, slow down on rhetorical questions.</li>
        </ul>
        <div className="main-rule">Main rule: Function over sound.</div>
      </div>

      <EnglishEntryForm onAdd={onAdd} />

      <Analytics
        byType={stats.byType}
        byMiss={stats.byMiss}
        total={stats.total}
        unreviewed={stats.unreviewed}
      />

      <EnglishTable entries={entries} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
