import cx from 'classnames';
import { escape } from 'lodash';
import { useRef, useEffect, useState } from 'react';
import { useDebounce, useAsyncEffect, useEventListener } from 'ahooks';
import { Button, Tooltip } from 'antd';
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import { ETextNotation } from '@/configs/settings';
import { useSettings, usePreviewContentDom, useKuroshiro } from '@/hooks';
import { contentToBlocks, getMarkPair, textToHtml, textNodeToElement } from '@/helpers';
import cssStyles from './Preview.module.less';

export function Preview() {
  const contentRef = useRef<HTMLDivElement>(null);

  const { settings, setSettings } = useSettings();
  const { previewPosition } = settings;
  const { setPreviewContentDom } = usePreviewContentDom();

  const content = useDebounce(settings.content, {
    wait: 300,
    leading: false,
    trailing: true,
  });

  const { kuroshiro, ready } = useKuroshiro();
  const [blocks, setBlocks] = useState<React.ReactNode>(null);

  useAsyncEffect(async () => {
    const MARK_PAIRS = getMarkPair(ETextNotation.NO_HURIGANA);

    const blocks = await contentToBlocks(content, {
      transform: [
        text => escape(text),
        async text => {
          if (!settings.huriganaize || !ready) {
            return text;
          }

          // 整行文字都不需要标注假名
          if (text.startsWith(MARK_PAIRS[0]) && text.endsWith(MARK_PAIRS[1])) {
            return text;
          }

          // 支持对字母进行假名标注
          text = text.replace(/[A-Z]/gi, '<ruby>$&<rp>(</rp><rt></rt><rp>)</rp></ruby>');

          // 支持对数字进行假名标注
          text = text.replace(/-?(?:\d*\.)?\d+/g, `<ruby>$&<rp>(</rp><rt></rt><rp>)</rp></ruby>`);
          // text = text.replace(/\d/g, `<ruby>$&<rp>(</rp><rt></rt><rp>)</rp></ruby>`);

          // 针对汉字自动标注假名
          text = await kuroshiro.convert(text, { mode: 'furigana', to: 'hiragana' });

          // 假名自动标注如有错误，可手动更正
          text = text.replace(/<rt>/g, '<rt contenteditable>');

          return text;
        },
        text => textToHtml(text),
        text => textNodeToElement(text),
      ],
    });

    setBlocks(blocks);
  }, [settings.huriganaize, content, kuroshiro, ready]);

  useEffect(() => {
    setPreviewContentDom(contentRef.current);
    return () => {
      setPreviewContentDom(null);
    };
  }, [setPreviewContentDom]);

  useEventListener(
    'focusin',
    (evt: FocusEvent) => {
      const evtTarget = evt.target as HTMLElement;
      if (!evtTarget.matches('rt[contenteditable]')) {
        return;
      }

      // @link https://stackoverflow.com/questions/3805852/select-all-text-in-contenteditable-div-when-it-focus-click
      const selection = document.getSelection();
      if (selection) {
        selection.removeAllRanges();

        // 聚焦时自动全选当前标注的假名
        const range = document.createRange();
        range.selectNodeContents(evtTarget);
        selection.addRange(range);
      }
    },
    { target: contentRef },
  );

  useEventListener(
    'beforeprint',
    () => {
      if (contentRef.current) {
        const { scrollWidth, scrollHeight } = contentRef.current;
        document.documentElement.style.setProperty('--print-size-w', `${scrollWidth}px`);
        document.documentElement.style.setProperty('--print-size-h', `${scrollHeight}px`);
      }
    },
    { target: window },
  );

  useEventListener(
    'afterprint',
    () => {
      document.documentElement.style.removeProperty('--print-size-w');
      document.documentElement.style.removeProperty('--print-size-h');
    },
    { target: window },
  );

  return (
    <div className={cx(cssStyles.previewPanel, 'preview-panel')}>
      <div
        className={cx(cssStyles.preview, {
          ['no-scrollbar']: true, // 纵向
        })}
      >
        <div
          ref={contentRef}
          className={cx(cssStyles.content, {
            ['no-scrollbar']: true, // 横向
          })}
        >
          {blocks}
        </div>
      </div>
      <Tooltip
        key={previewPosition}
        title={`プレビューエリアが${previewPosition === 'left' ? '右侧' : '左側'}に表示されます`}
        placement="right"
      >
        <Button
          type="link"
          icon={previewPosition === 'left' ? <RightSquareOutlined /> : <LeftSquareOutlined />}
          className={cssStyles.iconSetPreviewPosition}
          onClick={() => {
            setSettings(draft => {
              draft.previewPosition = previewPosition === 'left' ? 'right' : 'left';
            });
          }}
        />
      </Tooltip>
    </div>
  );
}
