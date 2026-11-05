import { useState, useCallback, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Tab, TabView } from '@rneui/themed';

import { Colors } from '../../../constants';

type IProps = {
  tabsCount: number;
  contents: React.ReactNode[];
  activeTab?: number;
  titles?: string[];
  color: string;
  colorInactive?: string;
  backgroundColor?: string;
  onChangeTab?: (index: number) => void;
};

export const BottomTabs = (props: IProps) => {
  const [index, setIndex] = useState(props.activeTab || 0);
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = (windowWidth * 0.8) / props.tabsCount;
  const [indicatorX, setIndicatorX] = useState((props.activeTab || 0) * tabWidth);

  useEffect(() => {
    if (props.activeTab !== undefined) {
      setIndex(props.activeTab);
      setIndicatorX(props.activeTab * tabWidth);
    }
  }, [props.activeTab, tabWidth]);

  const handleOnChangeTab = useCallback(
    (newIndex: number) => {
      setIndex(newIndex);
      setIndicatorX(newIndex * tabWidth); // Setting the right translateX value
      props.onChangeTab?.(newIndex); // inform parent on currentTab
    },
    [tabWidth, props],
  );

  return (
    <View style={[styles.container, { backgroundColor: props.backgroundColor ?? Colors.primary.white }]}>
      <TabView
        value={props.activeTab !== undefined ? props.activeTab : index}
        onChange={handleOnChangeTab}
        animationType="spring"
        containerStyle={{
          backgroundColor: props.backgroundColor ?? Colors.primary.white,
          marginHorizontal: -50,
        }}
      >
        {Array(props.tabsCount)
          .fill(0)
          .map((_, idx) => (
            <TabView.Item key={idx}>{props.contents[idx]}</TabView.Item>
          ))}
      </TabView>

      <View style={[styles.row, { marginBottom: 40 }]}>
        <Tab
          value={props.activeTab !== undefined ? props.activeTab : index}
          onChange={handleOnChangeTab}
          scrollable
          indicatorStyle={[
            {
              backgroundColor: props.color,
              height: 10,
              width: tabWidth - (props.colorInactive ? 8 : 0),
              transform: [{ translateX: indicatorX }],
              borderBottomColor: props.color,
              borderTopStartRadius: 4,
              borderTopEndRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
            props.colorInactive ? { borderBottomWidth: 10 } : null,
          ]}
          buttonStyle={{ width: tabWidth }}
        >
          {Array(props.tabsCount)
            .fill(0)
            .map((_, idx) => (
              <Tab.Item
                key={idx}
                title={props.titles?.[idx]}
                active={index === idx}
                titleStyle={{
                  fontSize: 13,
                  marginTop: 8,
                  color: index === idx ? props.color : props.colorInactive || props.color,
                }}
                containerStyle={
                  index !== idx && props.colorInactive
                    ? {
                        borderBottomColor: props.colorInactive,
                        borderBottomWidth: 10,
                        width: tabWidth - 8,
                        marginRight: 8,
                      }
                    : null
                }
              >
                {props.titles?.[idx]}
              </Tab.Item>
            ))}
        </Tab>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  row: {
    marginHorizontal: 4,
    marginBottom: 10,
  },
});
