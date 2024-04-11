export interface ISelectedData {
  start: number;
  end: number;
  text: string;
}

export const DEFAULT_SELECTED_DATA: ISelectedData = {
  start: 0,
  end: 0,
  text: '',
};
