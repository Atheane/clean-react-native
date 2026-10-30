import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type SvgComponent = React.ComponentType<{ width?: number; height?: number; style?: object }>;

interface WithSvgSelectorProps {
  svgList: SvgComponent[];
}

export const WithSvgSelector = (Story: React.ComponentType, { svgList }: WithSvgSelectorProps) => {
  const [selectedSvg, setSelectedSvg] = useState(0);
  const SelectedSvg = svgList[selectedSvg];

  return () => (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <Text>Sélectionnez un SVG :</Text>
        <View style={styles.svgList}>
          {svgList.map((SvgComponent, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedSvg(index)} style={styles.svgButton}>
              <SvgComponent width={50} height={50} style={{ opacity: selectedSvg === index ? 1 : 0.5 }} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.storyContainer}>
        <Story />
        <SelectedSvg width={200} height={200} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectorContainer: {
    padding: 10,
  },
  svgList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  svgButton: {
    margin: 5,
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
