import { isEqual } from 'lodash';
import { useEventListener, useDebounceFn } from 'ahooks';
import { DEFAULT_SELECTED_DATA } from '@/configs';
import { useContentInputDom } from '@/hooks/useContentInputDom';
import { useContentSelectedData } from './useContentSelectedData';

export function useAutoUpdateSelectedData() {
  const { contentInputDom } = useContentInputDom();
  const { selectedData, setSelectedData } = useContentSelectedData();

  const { run: updateSelectedData } = useDebounceFn(
    () => {
      const selection = document.getSelection();
      let nextSelectedData = DEFAULT_SELECTED_DATA;

      if (contentInputDom && selection?.focusNode === contentInputDom.parentNode) {
        const start = contentInputDom.selectionStart;
        const end = contentInputDom.selectionEnd;
        const text = contentInputDom.value.slice(start, end);
        nextSelectedData = { start, end, text };
      }

      if (!isEqual(nextSelectedData, selectedData)) {
        setSelectedData(nextSelectedData);
      }
    },
    { wait: 300, leading: false, trailing: true },
  );

  useEventListener('selectionchange', updateSelectedData, { target: document });
}
