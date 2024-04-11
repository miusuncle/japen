import { ETextNotation } from '@/configs/settings';

export type INormalText = string;

export type INotatedText = {
  text: INormalText | (INormalText | INotatedText)[];
  notation?: ETextNotation | ETextNotation[];
};

export type ITextManifest = INormalText | INotatedText | (INormalText | INotatedText)[];
