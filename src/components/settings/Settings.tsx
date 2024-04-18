import cx from 'classnames';
import { useRef, useEffect } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Switch,
  InputNumber,
  Button,
  Space,
  App,
  Popover,
  ConfigProvider,
} from 'antd';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { QuestionCircleFilled } from '@ant-design/icons';
import { useMemoizedFn, useLockFn, useUpdateEffect } from 'ahooks';
import * as html2Image from 'html-to-image';
import {
  useSettings,
  usePreviewContentDom,
  useContentInputDom,
  useContentSelectedData,
  useAutoUpdateSelectedData,
} from '@/hooks';
import { DEFAULT_SELECTED_DATA } from '@/configs';
import { themeList, fontFamilyList, writingModeList, textNotations } from '@/configs/settings';
import { exampleList } from '@/configs/example';
import { encrypt, copyText, copyFile, downloadFile } from '@/utils';
import { preface } from '@/helpers';
import fontFaces from '@/styles/font-face.less?inline';
import { ContentHelp } from './ContentHelp';
import { ContentToolbar } from './ContentToolbar';
import cssStyles from './Settings.module.less';

type Options = Exclude<Parameters<typeof html2Image.toBlob>[1], undefined>;

export function Settings() {
  const { message } = App.useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<TextAreaRef>(null);
  const resetSelectedDataTimerRef = useRef<number | null>(null);

  const [form] = Form.useForm<typeof settings>();
  const theme = Form.useWatch('theme', form);
  const fontFamily = Form.useWatch('fontFamily', form);
  const fontSize = Form.useWatch('fontSize', form);
  const writingMode = Form.useWatch('writingMode', form);
  const content = Form.useWatch('content', form);

  const { settings, setSettings } = useSettings();
  const { previewContentDom } = usePreviewContentDom();
  const { contentInputDom, setContentInputDom } = useContentInputDom();
  const { setSelectedData } = useContentSelectedData();
  useAutoUpdateSelectedData();

  useEffect(() => {
    setContentInputDom(textAreaRef.current?.resizableTextArea?.textArea || null);
    return () => {
      setContentInputDom(null);
    };
  }, [setContentInputDom]);

  const generateAndCopyImage = useLockFn(
    useMemoizedFn(async (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (evt.shiftKey) {
        window.print();
        return;
      }

      if (evt.metaKey) {
        const url = new URL(location.href);
        url.hash = encrypt(settings);
        const shareLink = url.toString();
        await copyText(shareLink);
        message.success('共有リンクはクリップボードにコピーされました。');
        return;
      }

      if (!previewContentDom) {
        return;
      }

      const width = previewContentDom.scrollWidth;
      const height = previewContentDom.scrollHeight;
      const scale = 3;

      const options: Options = {
        width,
        height,
        canvasWidth: width * scale,
        canvasHeight: height * scale,
        fontEmbedCSS: fontFaces,
      };

      const blob = await html2Image.toBlob(previewContentDom, options);
      if (!blob) {
        return;
      }

      if (evt.altKey || 'ontouchstart' in window) {
        // `Alt + Click` 或为移动端时，保存为文件
        downloadFile(blob);
      } else {
        copyFile(blob);
        message.success('画像はクリップボードにコピーされました。');
      }
    }),
  );

  useUpdateEffect(() => {
    setSettings(draft => {
      Object.assign(draft, { theme, fontFamily, fontSize, writingMode, content });
    });
  }, [theme, fontFamily, fontSize, writingMode, content]);

  return (
    <div
      ref={rootRef}
      className={cx(cssStyles.settingsPanel, 'settings-panel', {
        ['no-scrollbar']: true, // 纵向
      })}
    >
      <div className={cssStyles.settings}>
        <Form<typeof settings>
          form={form}
          layout="vertical"
          initialValues={settings}
          onValuesChange={(changesValues: Partial<typeof settings>) => {
            setSettings(draft => Object.assign(draft, changesValues));
          }}
        >
          <Form.Item label="主題" name="theme">
            <Radio.Group options={themeList} optionType="button" />
          </Form.Item>
          <Form.Item label="書体" name="fontFamily">
            <Select options={fontFamilyList} style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="フォントサイズ" name="fontSize">
            <InputNumber
              suffix="px"
              addonAfter={
                <Button
                  type="link"
                  size="small"
                  disabled={settings.fontSize === 18}
                  style={{
                    margin: `calc((var(--ant-input-number-padding-block) + 1px) * -1) calc(var(--ant-input-number-padding-inline) * -1)`,
                  }}
                  onClick={() => {
                    form.setFieldsValue({ fontSize: 18 });
                  }}
                >
                  {'リセット'}
                </Button>
              }
              inputMode="numeric"
              min={14}
              max={24}
              style={{ width: 150 }}
            />
          </Form.Item>
          <Form.Item label="組版" name="writingMode">
            <Radio.Group options={writingModeList} optionType="button" />
          </Form.Item>
          <Form.Item label="振仮名" name="huriganaize" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            label={
              <Space direction="vertical">
                <div>
                  <span
                    onClick={evt => {
                      if (evt.altKey) {
                        // Clear all notations
                        const content = textNotations.reduce((text, notation) => {
                          return text.replace(notation.pattern, '$1');
                        }, settings.content);
                        form.setFieldsValue({ content: content.trim() });
                      }
                    }}
                  >
                    {'本文'}
                  </span>
                  <ConfigProvider getPopupContainer={() => rootRef.current!}>
                    <Popover
                      trigger="hover"
                      placement="right"
                      arrow={{ pointAtCenter: true }}
                      content={<ContentHelp />}
                    >
                      <QuestionCircleFilled
                        style={{
                          cursor: 'help',
                          marginLeft: 4,
                        }}
                      />
                    </Popover>
                  </ConfigProvider>
                </div>
                <ContentToolbar />
              </Space>
            }
            name="content"
          >
            <Input.TextArea
              ref={textAreaRef}
              spellCheck={false}
              placeholder="キーボードからデータを入力する。"
              autoSize={{
                minRows: 8,
                maxRows: 14,
              }}
              style={{
                fontFamily: 'var(--preview-font-family)',
                fontSize: 16,
                textAlign: 'justify',
                wordBreak: 'break-word',
              }}
              onFocus={() => {
                if (resetSelectedDataTimerRef.current) {
                  window.clearTimeout(resetSelectedDataTimerRef.current);
                }
              }}
              onBlur={() => {
                resetSelectedDataTimerRef.current = window.setTimeout(() => {
                  setSelectedData(DEFAULT_SELECTED_DATA);

                  if (contentInputDom) {
                    contentInputDom.selectionStart = 0;
                    contentInputDom.selectionEnd = 0;
                  }
                }, 600);
              }}
            />
          </Form.Item>
          <Form.Item className={cssStyles.actionArea}>
            <Space direction="horizontal">
              <Button type="primary" onClick={generateAndCopyImage}>
                {'画像を作成してコピーする'}
              </Button>
              {!settings.content && (
                <Button
                  type="link"
                  onClick={evt => {
                    if (evt.altKey) {
                      form.setFieldsValue({ content: preface.v2() });
                      return;
                    }

                    form.setFieldsValue(exampleList[0]);
                  }}
                >
                  {'例を見る'}
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
