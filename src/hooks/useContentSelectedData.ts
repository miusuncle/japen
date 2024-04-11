import { useAtom } from 'jotai';
import { contentSelectedDataAtom } from '@/store/atoms';

export function useContentSelectedData() {
  const [selectedData, setSelectedData] = useAtom(contentSelectedDataAtom);
  return { selectedData, setSelectedData };
}
