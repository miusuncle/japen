import type { ThemeConfig } from 'antd';
import { createEntityCollection } from '@/utils';

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface IThemeOption {
  value: ETheme;
  label: string;
  themeToken: ThemeConfig['token'];
}

export const themeList: IThemeOption[] = [
  {
    value: ETheme.LIGHT,
    label: '浅色',
    themeToken: {
      colorPrimary: '#2073d1',
      colorInfo: '#2073d1',
      colorSuccess: '#13c2c2',
    },
  },
  {
    value: ETheme.DARK,
    label: '深色',
    themeToken: {
      colorPrimary: '#827cc1',
      colorInfo: '#827cc1',
      colorSuccess: '#13c2c2',
    },
  },
];

export const themeCollection = createEntityCollection(themeList, x => x.value);

export const themeCssVars = {
  [ETheme.LIGHT]: {
    '--preview-text-color': '#3b3b3b',
    '--preview-background-color': '#fbfbfb',
    '--preview-highlight-color': '#cf425b',
    '--preview-highlight-color-2': '#18a0b6',
    '--preview-highlight-color-weak': 'rgb(from var(--preview-highlight-color) r g b / 40%)',
    '--preview-highlight-invert-color': '#fbfbfb',
    '--preview-fluorescent-color': 'rgba(207, 66, 91, 0.3)',
    '--preview-fluorescent-underline-color': 'rgba(38, 212, 239, 0.8)',
    '--preview-text-stroke-color': 'rgba(38, 212, 239, 0.9)',
    '--preview-text-wavy-color': '#ef9026',
    '--preview-text-delete-color': 'rgba(255, 77, 79, 0.9)',
  },
  [ETheme.DARK]: {
    '--preview-text-color': '#f3f4e9',
    '--preview-background-color': '#282828',
    '--preview-highlight-color': '#ef9026',
    '--preview-highlight-color-2': '#0eabc3',
    '--preview-highlight-color-weak': `rgb(from var(--preview-highlight-color) r g b / 40%)`,
    '--preview-highlight-invert-color': '#221d10',
    '--preview-fluorescent-color': 'rgba(85, 121, 160, 0.6)',
    '--preview-fluorescent-underline-color': 'rgba(10, 167, 87, 0.8)',
    '--preview-text-stroke-color': 'rgba(255, 77, 80, 0.6)',
    '--preview-text-wavy-color': 'rgba(255, 77, 80, 0.6)',
    '--preview-text-delete-color': 'rgba(255, 77, 79, 0.9)',
  },
} as const;
