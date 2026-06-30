import { useState } from 'react';
import type { EnglishEntry, EnglishQuestionType, MissType } from '../types';

const QUESTION_TYPES: EnglishQuestionType[] = [
  'transition', 'placement', 'add/delete', 'purpose', 'support', 'wording', 'grammar',
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function newEntry(): Omit<EnglishEntry, 'id'> {
  return {
    date: today(),
    source: '',
    questionNum: '',
    questionType: 'transition',
    missType: 'missed',
    whyMissed: '',
    ruleFix: '',
    reviewed: 'no',
  };
}

interface Props {
  onAdd: (entry: EnglishEntry) => void;
}

export function EnglishEntryForm({ onAdd }: Props) {
  const [form, setForm] = useState(newEntry());

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.source || !form.questionNum) {
      alert('Source/Test and Question # are required.');
      return;
    }
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm(newEntry());
  }

  return (
    <form className="entry-form" onSubmit={submit}>
      <h3>+ Add English Error</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Source / Test *</label>
          <input placeholder="e.g. Prep 2023-4" value={form.source} onChange={(e) => set('source', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Question # *</label>
          <input placeholder="e.g. 42" value={form.questionNum} onChange={(e) => set('questionNum', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Question Type</label>
          <select value={form.questionType} onChange={(e) => set('questionType', e.target.value)}>
            {QUESTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Miss Type</label>
          <select value={form.missType} onChange={(e) => set('missType', e.target.value as MissType)}>
            <option value="missed">missed</option>
            <option value="guessed">guessed</option>
            <option value="slow">slow</option>
          </select>
        </div>
        <div className="form-group">
          <label>Why Missed</label>
          <textarea placeholder="What went wrong?" value={form.whyMissed} onChange={(e) => set('whyMissed', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Rule / Fix</label>
          <textarea placeholder="What to do next time?" value={form.ruleFix} onChange={(e) => set('ruleFix', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Reviewed?</label>
          <select value={form.reviewed} onChange={(e) => set('reviewed', e.target.value)}>
            <option value="no">no</option>
            <option value="yes">yes</option>
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Add Entry</button>
        <button type="button" className="btn btn-ghost" onClick={() => setForm(newEntry())}>Clear</button>
      </div>
    </form>
  );
}
