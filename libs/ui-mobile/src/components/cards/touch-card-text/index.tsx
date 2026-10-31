import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useTheme } from '@rneui/themed';

type IProps = {
  text: string;
  onPress: () => void;
};

const KPI_CARD_RATIO = 112 / 174;

export const TouchCardText: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[theme.container.card.kpi, Platform.OS === 'web' ? styles.webShadow : theme.shadow.card]}
    >
      <Text style={[styles.textContainer, theme.text.darkBlue, { fontSize: 13, lineHeight: 15 }]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
    marginTop: 8,
    textAlign: 'left',
  },
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
