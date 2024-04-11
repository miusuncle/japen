import { Typography, Space, ConfigProvider } from 'antd';
import { ETextNotation } from '@/configs/settings';
import { wrapWithMark } from '@/helpers';

const { Paragraph, Text } = Typography;

export function ContentHelp() {
  return (
    <Paragraph style={{ marginBottom: 0, userSelect: 'none' }}>
      <div>
        <Text strong>{'チップス'}</Text>
      </div>
      <ul style={{ marginBottom: 0 }}>
        <li>
          <Space direction="horizontal">
            <Text
              strong
              style={{
                color: 'var(--preview-highlight-color)',
              }}
            >
              {'タイトル'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.TITLE)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text strong>{'ボールド'}</Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.BOLD)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                color: 'var(--preview-highlight-color)',
              }}
            >
              {'テキストをハイライト (L1)'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.HIGHLIGHT)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                color: 'var(--preview-highlight-color-2)',
              }}
            >
              {'テキストをハイライト (L2)'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.HIGHLIGHT_L2)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                opacity: 0.65,
              }}
            >
              {'テキストを半透明にする'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.DIMMED)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                backgroundColor: 'var(--preview-fluorescent-color)',
              }}
            >
              {'テキストをマーク'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.FLUORESCENT)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                color: 'var(--preview-highlight-invert-color)',
                backgroundColor: 'var(--preview-highlight-color)',
              }}
            >
              {'テキストをマーク'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.FILL)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                outline: '1px solid var(--preview-text-stroke-color)',
              }}
            >
              {'テキストに枠を追加'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.STROKE)}</Text>
          </Space>
        </li>
        <li>
          <Text>{'アンダーバー'}</Text>
          <ConfigProvider theme={{ token: { fontFamily: 'PingFang SC', fontSize: 12 } }}>
            <ul>
              <li>
                <Space direction="horizontal">
                  <Text
                    style={{
                      borderBlockEnd: '2px solid var(--preview-highlight-color)',
                    }}
                  >
                    {'SOLID'}
                  </Text>
                  <Text code>{wrapWithMark('TEXT', ETextNotation.UNDERLINE_SOLID)}</Text>
                </Space>
              </li>
              <li>
                <Space direction="horizontal">
                  <Text
                    style={{
                      borderBlockEnd: '2px dashed var(--preview-highlight-color-weak)',
                    }}
                  >
                    {'DASHED'}
                  </Text>
                  <Text code>{wrapWithMark('TEXT', ETextNotation.UNDERLINE_DASHED)}</Text>
                </Space>
              </li>
              <li>
                <Space direction="horizontal">
                  <Text
                    style={{
                      borderBlockEnd: '2px dotted var(--preview-highlight-color-weak)',
                    }}
                  >
                    {'DOTTED'}
                  </Text>
                  <Text code>{wrapWithMark('TEXT', ETextNotation.UNDERLINE_DOTTED)}</Text>
                </Space>
              </li>
              <li>
                <Space direction="horizontal">
                  <Text
                    style={{
                      textDecoration: 'underline',
                      textDecorationStyle: 'wavy',
                      textUnderlineOffset: 3,
                      textDecorationColor: 'var(--preview-text-wavy-color)',
                    }}
                  >
                    {'WAVY'}
                  </Text>
                  <Text code>{wrapWithMark('TEXT', ETextNotation.UNDERLINE_WAVY)}</Text>
                </Space>
              </li>
              <li>
                <Space direction="horizontal">
                  <Text
                    style={{
                      borderBlockEnd: '5px solid var(--preview-fluorescent-underline-color)',
                    }}
                  >
                    {'FLUORESCENT'}
                  </Text>
                  <Text code>{wrapWithMark('TEXT', ETextNotation.UNDERLINE_FLUORESCENT)}</Text>
                </Space>
              </li>
            </ul>
          </ConfigProvider>
        </li>
        <li>
          <Space direction="horizontal">
            <Text
              style={{
                textDecoration: 'line-through',
                textDecorationColor: 'var(--preview-text-delete-color)',
              }}
            >
              {'取り消し線'}
            </Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.LINE_THROUGH)}</Text>
          </Space>
        </li>
        <li>
          <Space direction="horizontal">
            <Text>{'漢字に振り仮名をつけない'}</Text>
            <Text code>{wrapWithMark('TEXT', ETextNotation.NO_HURIGANA)}</Text>
          </Space>
        </li>
      </ul>
    </Paragraph>
  );
}
