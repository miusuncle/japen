import { useMemo } from 'react';
import { useLockFn } from 'ahooks';
import { Tooltip, Button, Form } from 'antd';
import { delay } from '@/utils';
import { applyTextNotation } from '@/helpers';
import { type ISelectedData } from '@/configs';
import { ETextNotation, textNotationCollection, type IFormField } from '@/configs/settings';
import { useContentInputDom } from '@/hooks';

export interface ToolbarIconProps {
  notation: ETextNotation;
  selectedData: ISelectedData;
}

export function ToolbarIcon(props: ToolbarIconProps) {
  const { notation, selectedData } = props;
  const notionEntity = textNotationCollection.entities[notation];
  const form = Form.useFormInstance<IFormField>();
  const { contentInputDom } = useContentInputDom();

  const status = useMemo(() => {
    let disabled: string | false = false;
    let applied = false;

    if (!selectedData.text) {
      disabled = '请先选择文字';
    } else if (notionEntity.pattern.test(selectedData.text)) {
      applied = true;
    } else if (selectedData.text.includes('\n')) {
      disabled = '所选文字不能包含换行';
    }

    return { disabled, applied };
  }, [notionEntity, selectedData]);

  const handleIconClick = useLockFn(async () => {
    if (!contentInputDom) {
      return;
    }

    contentInputDom.focus();

    const { start, end, text } = selectedData;
    const { content: oldContent } = form.getFieldsValue();

    let replacedText: string;
    if (status.applied) {
      replacedText = text.replace(notionEntity.pattern, '$1');
    } else {
      replacedText = applyTextNotation(text, notation);
    }

    const newContent = `${oldContent.slice(0, start)}${replacedText}${oldContent.slice(end)}`;
    form.setFieldsValue({ content: newContent });

    await delay(0);
    contentInputDom.selectionStart = start;
    contentInputDom.selectionEnd = start + replacedText.length;
    await delay(300);
    contentInputDom.focus();
  });

  return (
    <Tooltip
      title={
        status.disabled ||
        (status.applied ? notionEntity.tooltips.remove : notionEntity.tooltips.add)
      }
      mouseEnterDelay={0.2}
      mouseLeaveDelay={0}
    >
      <Button
        type={status.disabled ? 'text' : status.applied ? 'link' : 'text'}
        disabled={Boolean(status.disabled)}
        icon={notionEntity.icon}
        style={{ borderRadius: 0 }}
        onClick={handleIconClick}
      />
    </Tooltip>
  );
}
