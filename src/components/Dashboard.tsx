import type { EnglishEntry, ReadingEntry } from '../types';
import { englishStats, readingStats } from '../utils/stats';

interface Props {
  english: EnglishEntry[];
  reading: ReadingEntry[];
  onNav: (tab: 'english' | 'reading') => void;
}

export function Dashboard({ english, reading, onNav }: Props) {
  const es = englishStats(english);
  const rs = readingStats(reading);
  const totalUnreviewed = es.unreviewed + rs.unreviewed;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.5px' }}>ACT Error Logs</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
          English &amp; Reading — July 11 ACT
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="big-card" onClick={() => onNav('english')}>
          <h2>English Log</h2>
          <div className="stat">{es.total}</div>
          <div className="label">errors logged</div>
          {es.mostCommonType && (
            <div className="label" style={{ marginTop: '0.5rem' }}>
              Top miss: <strong style={{ color: 'var(--text)' }}>{es.mostCommonType}</strong>
            </div>
          )}
          <div className="motto">Function over sound.</div>
        </div>

        <div className="big-card" onClick={() => onNav('reading')}>
          <h2>Reading Log</h2>
          <div className="stat">{rs.total}</div>
          <div className="label">errors logged</div>
          {rs.mostCommonType && (
            <div className="label" style={{ marginTop: '0.5rem' }}>
              Top miss: <strong style={{ color: 'var(--text)' }}>{rs.mostCommonType}</strong>
            </div>
          )}
          <div className="motto">Proof over vibes.</div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-chip">
          <div className="num">{es.total}</div>
          <div className="lbl">English errors</div>
        </div>
        <div className="stat-chip">
          <div className="num">{rs.total}</div>
          <div className="lbl">Reading errors</div>
        </div>
        <div className="stat-chip">
          <div className="num" style={{ color: totalUnreviewed > 0 ? 'var(--warning)' : 'var(--accent2)' }}>
            {totalUnreviewed}
          </div>
          <div className="lbl">Unreviewed</div>
        </div>
        <div className="stat-chip">
          <div className="num" style={{ fontSize: '1rem', paddingTop: '0.3rem' }}>
            {es.mostCommonType ?? '—'}
          </div>
          <div className="lbl">Top English miss</div>
        </div>
        <div className="stat-chip">
          <div className="num" style={{ fontSize: '1rem', paddingTop: '0.3rem' }}>
            {rs.mostCommonType ?? '—'}
          </div>
          <div className="lbl">Top Reading miss</div>
        </div>
      </div>

      {totalUnreviewed > 0 && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--warning)',
          borderRadius: 'var(--radius)',
          padding: '0.9rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--warning)',
          fontSize: '0.9rem',
        }}>
          <span style={{ fontSize: '1.1rem' }}>⚠</span>
          <span>
            <strong>{totalUnreviewed}</strong> unreviewed {totalUnreviewed === 1 ? 'question' : 'questions'} need review.
          </span>
        </div>
      )}
    </div>
  );
}
