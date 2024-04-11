import { useAtom } from 'jotai';
import { contentInputDomAtom } from '@/store/atoms';

export function useContentInputDom() {
  const [contentInputDom, setContentInputDom] = useAtom(contentInputDomAtom);
  return { contentInputDom, setContentInputDom };
}
