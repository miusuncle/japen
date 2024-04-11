import { groupBy } from 'lodash';
import { useMemo } from 'react';
import { Space, ConfigProvider } from 'antd';
import { textNotations } from '@/configs/settings';
import { useContentSelectedData } from '@/hooks';
import { ToolbarIcon } from './ToolbarIcon';
import cssStyles from './ContentToolbar.module.less';

export function ContentToolbar() {
  const { selectedData } = useContentSelectedData();

  const groupedTextNotations = useMemo(() => {
    return Object.values(groupBy(textNotations, x => x.group));
  }, []);

  return (
    <ConfigProvider theme={{ token: { fontFamily: 'PingFang SC', fontSize: 16 } }}>
      <Space direction="horizontal" wrap>
        {groupedTextNotations.map((groupedList, index) => (
          <Space key={index} direction="horizontal" size={0} className={cssStyles.toolbar}>
            {groupedList.map(notation => {
              return (
                <ToolbarIcon
                  key={notation.value}
                  notation={notation.value}
                  selectedData={selectedData}
                />
              );
            })}
          </Space>
        ))}
      </Space>
    </ConfigProvider>
  );
}
