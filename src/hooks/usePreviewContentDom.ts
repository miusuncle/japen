import { useAtom } from 'jotai';
import { previewContentDomAtom } from '@/store/atoms';

export function usePreviewContentDom() {
  const [previewContentDom, setPreviewContentDom] = useAtom(previewContentDomAtom);
  return { previewContentDom, setPreviewContentDom };
}
