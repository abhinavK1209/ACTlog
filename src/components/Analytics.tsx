interface Props {
  byType: Record<string, number>;
  byMiss: Record<string, number>;
  total: number;
  unreviewed: number;
}

function BarList({ data, color }: { data: Record<string, number>; color?: string }) {
  const max = Math.max(...Object.values(data), 1);
  return (
    <div className="bar-list">
      {Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([key, val]) => (
          <div className="bar-item" key={key}>
            <div className="bar-label">
              <span>{key}</span>
              <span>{val}</span>
            </div>
            <div className="bar-track">
              <div
                className={`bar-fill ${color ?? ''}`}
                style={{ width: `${(val / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export function Analytics({ byType, byMiss, total, unreviewed }: Props) {
  const reviewed = total - unreviewed;
  return (
    <div className="analytics-grid">
      <div className="card">
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '0.25rem' }}>By Question Type</div>
        {Object.keys(byType).length === 0
          ? <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>No data yet</div>
          : <BarList data={byType} />}
      </div>
      <div className="card">
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '0.25rem' }}>By Miss Type</div>
        {Object.keys(byMiss).length === 0
          ? <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>No data yet</div>
          : <BarList data={byMiss} color="yellow" />}
      </div>
      <div className="card">
        <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginBottom: '0.25rem' }}>Review Status</div>
        <div className="bar-list" style={{ marginTop: '0.75rem' }}>
          <div className="bar-item">
            <div className="bar-label"><span>Reviewed</span><span>{reviewed}</span></div>
            <div className="bar-track">
              <div className="bar-fill green" style={{ width: total ? `${(reviewed / total) * 100}%` : '0%' }} />
            </div>
          </div>
          <div className="bar-item">
            <div className="bar-label"><span>Unreviewed</span><span>{unreviewed}</span></div>
            <div className="bar-track">
              <div className="bar-fill yellow" style={{ width: total ? `${(unreviewed / total) * 100}%` : '0%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
