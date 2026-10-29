import { useState, useCallback } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import { IconNode } from '@rneui/base';

import { Colors } from '../../constants';

type IProps = {
  tabsCount: number;
  icons: IconNode[];
  contents: React.ReactNode[];
  titles: string[];
  changeTab?: (index: number) => void;
  color: string;
  colorInactive?: string;
  backgroundColor?: string;
};

export const Tabs = (props: IProps) => {
  const [index, setIndex] = useState<number>(0);

  // https://github.com/react-native-elements/react-native-elements/issues/3784
  const [indicatorX, setIndicatorX] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = windowWidth / props.tabsCount; // Specify your tabs amount

  const handleOnChangeTab = useCallback(
    (index: number) => {
      setIndex(index);
      setIndicatorX(index * tabWidth); // Setting the right translateX value
      props.changeTab?.(index);
    },
    [tabWidth, props],
  );
  return (
    <View style={[styles.container, { backgroundColor: props.backgroundColor ?? Colors.primary.white }]}>
      <View style={styles.row}>
        <Tab
          value={index}
          onChange={handleOnChangeTab}
          scrollable
          indicatorStyle={[
            {
              backgroundColor: props.color,
              height: 3,
              width: Dimensions.get('window').width / props.tabsCount - (props.colorInactive ? 8 : 0),
              transform: [{ translateX: indicatorX }], // Overriding the buggy string from the source
              borderBottomColor: props.color,
              borderTopStartRadius: 4,
              borderTopEndRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
            props.colorInactive ? { borderBottomWidth: 4 } : null,
          ]}
          buttonStyle={{ width: Dimensions.get('window').width / props.tabsCount }}
        >
          {Array(props.tabsCount)
            .fill(0)
            .map((_, idx) => (
              <Tab.Item
                key={idx}
                title={props.titles[idx]}
                active={index === idx}
                titleStyle={{
                  fontSize: 13,
                  marginTop: 8,
                  color: props.color,
                }}
                icon={props.icons[idx] as IconNode}
                containerStyle={
                  index !== idx && props.colorInactive
                    ? {
                        borderBottomColor: props.colorInactive,
                        borderBottomWidth: 4,
                        width: Dimensions.get('window').width / props.tabsCount - 8,
                        marginRight: 8,
                      }
                    : null
                }
              >
                {props.titles[idx]}
              </Tab.Item>
            ))}
        </Tab>
      </View>

      <View style={[styles.tabContent, { marginTop: 10 }]}>
        <TabView
          value={index}
          onChange={handleOnChangeTab}
          animationType="spring"
          containerStyle={{
            backgroundColor: props.backgroundColor ?? Colors.primary.white,
          }}
        >
          {Array(props.tabsCount)
            .fill(0)
            .map((_, idx) => (
              <TabView.Item key={idx} style={[{ width: '100%' }]}>
                <View style={styles.tabContent}>{props.contents[idx]}</View>
              </TabView.Item>
            ))}
        </TabView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    marginTop: 0,
  },
  row: {
    width: Dimensions.get('window').width,
    marginHorizontal: 4,
  },
  addBeneficiary: {
    position: 'relative',
    top: 0,
    right: 0,
  },
  tabContent: {
    flex: 1,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    marginTop: 24,
  },
});
