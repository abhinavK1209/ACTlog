import { useState } from 'react';
import type { EnglishEntry, EnglishQuestionType, MissType } from '../types';

const QUESTION_TYPES: EnglishQuestionType[] = [
  'transition', 'placement', 'add/delete', 'purpose', 'support', 'wording', 'grammar',
];

type SortKey = 'date' | 'questionType' | 'reviewed';

interface Props {
  entries: EnglishEntry[];
  onUpdate: (entry: EnglishEntry) => void;
  onDelete: (id: string) => void;
}

function MissBadge({ type }: { type: string }) {
  return <span className={`badge badge-${type}`}>{type}</span>;
}
function ReviewBadge({ val }: { val: string }) {
  return <span className={`badge badge-${val}`}>{val}</span>;
}

export function EnglishTable({ entries, onUpdate, onDelete }: Props) {
  const [filterType, setFilterType] = useState('');
  const [filterMiss, setFilterMiss] = useState('');
  const [filterReviewed, setFilterReviewed] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [editing, setEditing] = useState<EnglishEntry | null>(null);

  const sources = [...new Set(entries.map((e) => e.source))].filter(Boolean);

  let filtered = entries.filter((e) => {
    if (filterType && e.questionType !== filterType) return false;
    if (filterMiss && e.missType !== filterMiss) return false;
    if (filterReviewed && e.reviewed !== filterReviewed) return false;
    if (filterSource && e.source !== filterSource) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    const av = a[sortKey] as string;
    const bv = b[sortKey] as string;
    return av < bv ? -sortDir : av > bv ? sortDir : 0;
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 1 ? -1 : 1));
    else { setSortKey(key); setSortDir(-1); }
  }

  function arrow(key: SortKey) {
    if (sortKey !== key) return ' ↕';
    return sortDir === -1 ? ' ↓' : ' ↑';
  }

  return (
    <>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All types</option>
          {QUESTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterMiss} onChange={(e) => setFilterMiss(e.target.value)}>
          <option value="">All miss types</option>
          <option value="missed">missed</option>
          <option value="guessed">guessed</option>
          <option value="slow">slow</option>
        </select>
        <select value={filterReviewed} onChange={(e) => setFilterReviewed(e.target.value)}>
          <option value="">All reviewed</option>
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
        <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
          <option value="">All sources</option>
          {sources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>
          {filtered.length} / {entries.length} entries
        </span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th onClick={() => toggleSort('date')}>Date{arrow('date')}</th>
              <th>Source</th>
              <th>Q#</th>
              <th onClick={() => toggleSort('questionType')}>Type{arrow('questionType')}</th>
              <th>Miss</th>
              <th>Why Missed</th>
              <th>Rule/Fix</th>
              <th onClick={() => toggleSort('reviewed')}>Reviewed{arrow('reviewed')}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="empty-state">No entries yet. Add one above.</td></tr>
            ) : filtered.map((e) => (
              <tr key={e.id} className={e.reviewed === 'no' ? 'unreviewed' : ''}>
                <td style={{ whiteSpace: 'nowrap' }}>{e.date}</td>
                <td>{e.source}</td>
                <td>{e.questionNum}</td>
                <td><span className="badge" style={{ background: 'var(--surface2)', color: 'var(--text)' }}>{e.questionType}</span></td>
                <td><MissBadge type={e.missType} /></td>
                <td style={{ maxWidth: 200, fontSize: '0.82rem' }}>{e.whyMissed}</td>
                <td style={{ maxWidth: 200, fontSize: '0.82rem' }}>{e.ruleFix}</td>
                <td><ReviewBadge val={e.reviewed} /></td>
                <td>
                  <div className="td-actions">
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditing({ ...e })}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => {
                      if (confirm(`Delete Q#${e.questionNum} from ${e.source}?`)) onDelete(e.id);
                    }}>Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditModal entry={editing} onChange={setEditing} onSave={() => { onUpdate(editing); setEditing(null); }} onClose={() => setEditing(null)} />
      )}
    </>
  );
}

function EditModal({ entry, onChange, onSave, onClose }: {
  entry: EnglishEntry;
  onChange: (e: EnglishEntry) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  function set(key: keyof EnglishEntry, val: string) {
    onChange({ ...entry, [key]: val });
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit English Entry</h3>
        <div className="form-grid">
          <div className="form-group"><label>Date</label><input type="date" value={entry.date} onChange={(e) => set('date', e.target.value)} /></div>
          <div className="form-group"><label>Source</label><input value={entry.source} onChange={(e) => set('source', e.target.value)} /></div>
          <div className="form-group"><label>Question #</label><input value={entry.questionNum} onChange={(e) => set('questionNum', e.target.value)} /></div>
          <div className="form-group">
            <label>Question Type</label>
            <select value={entry.questionType} onChange={(e) => set('questionType', e.target.value)}>
              {QUESTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Miss Type</label>
            <select value={entry.missType} onChange={(e) => set('missType', e.target.value as MissType)}>
              <option value="missed">missed</option>
              <option value="guessed">guessed</option>
              <option value="slow">slow</option>
            </select>
          </div>
          <div className="form-group"><label>Why Missed</label><textarea value={entry.whyMissed} onChange={(e) => set('whyMissed', e.target.value)} /></div>
          <div className="form-group"><label>Rule/Fix</label><textarea value={entry.ruleFix} onChange={(e) => set('ruleFix', e.target.value)} /></div>
          <div className="form-group">
            <label>Reviewed?</label>
            <select value={entry.reviewed} onChange={(e) => set('reviewed', e.target.value)}>
              <option value="no">no</option>
              <option value="yes">yes</option>
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
