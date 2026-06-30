export type MissType = 'missed' | 'guessed' | 'slow';
export type Reviewed = 'yes' | 'no';

export type EnglishQuestionType =
  | 'transition'
  | 'placement'
  | 'add/delete'
  | 'purpose'
  | 'support'
  | 'wording'
  | 'grammar';

export type ReadingQuestionType =
  | 'detail'
  | 'inference'
  | 'main idea'
  | 'evidence'
  | 'integration'
  | 'pacing';

export interface EnglishEntry {
  id: string;
  date: string;
  source: string;
  questionNum: string;
  questionType: EnglishQuestionType;
  missType: MissType;
  whyMissed: string;
  ruleFix: string;
  reviewed: Reviewed;
}

export interface ReadingEntry {
  id: string;
  date: string;
  source: string;
  questionNum: string;
  questionType: ReadingQuestionType;
  missType: MissType;
  proofLocation: string;
  whyMissed: string;
  fixNextTime: string;
  reviewed: Reviewed;
}
