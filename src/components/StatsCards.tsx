import type { EnglishEntry, ReadingEntry } from '../types';
import { englishStats, readingStats } from '../utils/stats';

interface Props {
  english: EnglishEntry[];
  reading: ReadingEntry[];
}

export function StatsCards({ english, reading }: Props) {
  const es = englishStats(english);
  const rs = readingStats(reading);
  const totalUnreviewed = es.unreviewed + rs.unreviewed;

  return (
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
        <div className="num" style={{ color: 'var(--warning)' }}>{totalUnreviewed}</div>
        <div className="lbl">Unreviewed</div>
      </div>
      <div className="stat-chip">
        <div className="num" style={{ fontSize: '1rem', paddingTop: '0.3rem' }}>
          {es.mostCommonType ?? '—'}
        </div>
        <div className="lbl">Top English miss type</div>
      </div>
      <div className="stat-chip">
        <div className="num" style={{ fontSize: '1rem', paddingTop: '0.3rem' }}>
          {rs.mostCommonType ?? '—'}
        </div>
        <div className="lbl">Top Reading miss type</div>
      </div>
    </div>
  );
}
