import cx from 'classnames';
import { ConfigProvider, Card, App as AntdApp, theme } from 'antd';
import { baseThemeToken } from '@/configs';
import {
  DEFAULT_FONT_FAMILY,
  ETheme,
  themeCollection,
  themeCssVars,
  writingModeCssVars,
  EWritingMode,
} from '@/configs/settings';
import { useGlobalStore } from '@/store/global';
import { Settings, Preview } from '@/components';
import { useSettings } from '@/hooks';
import cssStyles from './App.module.less';

export function App() {
  const { globalState } = useGlobalStore();
  const { settings } = useSettings();

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          ...baseThemeToken,
          ...themeCollection.entities[settings.theme].themeToken,
        },
        algorithm: settings.theme === ETheme.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <AntdApp
        className={cx({
          ['with-hurigana']: settings.huriganaize,
          [`writing-mode-${settings.writingMode === EWritingMode.HORIZONTAL_TB ? 'horizontal' : 'vertical'}`]:
            true,
        })}
        style={
          {
            ...themeCssVars[settings.theme],
            ...writingModeCssVars[settings.writingMode],
            ...{
              '--preview-font-family': [`"${settings.fontFamily}"`, DEFAULT_FONT_FAMILY]
                .filter(Boolean)
                .join(', '),
              '--preview-writing-mode': settings.writingMode,
              '--preview-font-size': `${settings.fontSize}px`,
              '--preview-line-height':
                settings.huriganaize && globalState.huriganaizeReady ? 2 : 1.5,
            },
          } as React.CSSProperties
        }
      >
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <div
            className={cx(cssStyles.root, 'container', {
              [cssStyles.previewLeft]: settings.previewPosition === 'left',
            })}
          >
            <Settings />
            <Preview />
          </div>
        </Card>
      </AntdApp>
    </ConfigProvider>
  );
}
