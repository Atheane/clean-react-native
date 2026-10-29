import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants';
import { StepEmpty, StepCurrent, StepDone, StepsConnector } from '../../../assets';

type IProps = {
  currentPosition: number;
  labels: string[];
  onCirclePress: (position: number) => void;
};

const ClickableCircle = ({ onPress, children }: { onPress: () => void; children: React.ReactNode }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    <View style={styles.circleContainer}>{children}</View>
  </TouchableOpacity>
);

const StepComponent = ({
  currentPosition,
  position,
  onCirclePress,
}: {
  currentPosition: number;
  position: number;
  onCirclePress: (position: number) => void;
}) => {
  let StepIcon;
  if (position < currentPosition) {
    StepIcon = <StepDone />;
  } else if (position === currentPosition) {
    StepIcon = <StepCurrent />;
  } else {
    StepIcon = <StepEmpty />;
  }

  return <ClickableCircle onPress={() => onCirclePress(position)}>{StepIcon}</ClickableCircle>;
};

export const StepsIndicator = ({ currentPosition, labels, onCirclePress }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsConnector}>
        <StepsConnector />
      </View>
      <View style={styles.circlesContainer}>
        {labels.map((_, index) => (
          <StepComponent
            key={index}
            currentPosition={currentPosition}
            position={index + 1}
            onCirclePress={onCirclePress}
          />
        ))}
      </View>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <TouchableOpacity key={index} onPress={() => onCirclePress(index + 1)}>
            <View key={index} style={styles.labelContainer}>
              <Text
                key={index}
                style={{
                  color: index + 1 === currentPosition ? Colors.primary.darkBlue : Colors.primary.grey,
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    paddingVertical: 16,
  },
  stepsConnector: {
    position: 'relative',
    top: 19,
  },
  labelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  circlesContainer: {
    flexDirection: 'row',
  },
  circleContainer: {
    marginHorizontal: 45.5,
  },
});
