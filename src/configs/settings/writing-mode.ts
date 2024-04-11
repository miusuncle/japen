import { createEntityCollection } from '@/utils';

export enum EWritingMode {
  HORIZONTAL_TB = 'horizontal-tb',
  VERTICAL_RL = 'vertical-rl',
}

export const writingModeList = [
  { value: EWritingMode.HORIZONTAL_TB, label: '横列' },
  { value: EWritingMode.VERTICAL_RL, label: '縦列' },
];

export const writingModeCollection = createEntityCollection(writingModeList, x => x.value);

export const writingModeCssVars = {
  [EWritingMode.HORIZONTAL_TB]: {
    '--preview-writing-mode': 'horizontal-tb',
    '--preview-min-height': '400px',
    '--preview-height': 'auto',
    '--preview-text-underline-offset': '2px',
  },
  [EWritingMode.VERTICAL_RL]: {
    '--preview-writing-mode': 'vertical-rl',
    '--preview-min-height': '600px',
    '--preview-height': 'var(--preview-min-height)',
    '--preview-text-underline-offset': '1px',
  },
} as const;
