import { useState, useCallback } from 'react';
import { StyleSheet, Pressable, Text, View, TouchableOpacity } from 'react-native';

import { Delete } from '../../../assets';
import { Colors } from '../../../constants';

const CODE_LENGTH = 6;

type Props = {
  onChange: (code: string) => void;
};

export const PhoneSecurityPinInput = ({ onChange }: Props) => {
  const codeDigitsArray = ['', '', '', '', '', ''];

  const initCode: string[] = [];
  const [code, setCode] = useState(initCode);

  const toDigitInput = (_value: string, idx: number) => {
    const bulletStyle = idx < code.length ? { ...styles.bullet, ...styles.bulletFocused } : styles.bullet;

    return (
      <View key={idx} style={styles.bulletContainer}>
        <Text adjustsFontSizeToFit={true} style={bulletStyle}>
          .
        </Text>
      </View>
    );
  };

  const handleOnPressDigit = useCallback(
    (digit: string) => {
      if (code.length < CODE_LENGTH) {
        const newCode = [...code, digit];
        setCode(newCode);
        onChange(newCode.join(''));
      }
    },
    [code, onChange],
  );

  const handleDelete = useCallback(() => {
    if (code.length > 0) {
      const newCode = code.slice(0, -1);
      setCode(newCode);
      onChange(newCode.join(''));
    }
  }, [code, onChange]);

  const GridNumbers = ({ length, height }: { length: number; height: number }) => {
    const Cell = ({ digit }: { digit: string }) => (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={digit === 'delete' ? handleDelete : () => handleOnPressDigit(digit)}
      >
        {digit === 'delete' ? (
          <View style={styles.deleteCell}>
            <Delete />
          </View>
        ) : (
          <Text adjustsFontSizeToFit={true} style={styles.cell}>
            {digit}
          </Text>
        )}
      </TouchableOpacity>
    );

    const digits = [...Array(10).keys()].map((digit: number) => digit.toString());

    const phonePad = [...digits, '', '0', 'delete'];

    let counter = 0;

    return (
      <View style={styles.gridContainer}>
        {[...Array(height).keys()].map((y: number) => {
          return (
            <View key={y} style={styles.gridRow}>
              {[...Array(length).keys()].map((x: number) => {
                counter += 1;
                return <Cell key={x} digit={phonePad[counter]} />;
              })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.bulletsContainer}>{codeDigitsArray.map(toDigitInput)}</Pressable>
      <GridNumbers length={3} height={4} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bulletsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -100,
    width: 225,
  },
  bulletContainer: {
    width: 52,
  },
  bullet: {
    fontSize: 100,
    marginLeft: 27,
    color: Colors.input.lightGreen,
  },
  bulletFocused: {
    color: Colors.text.darkBlue,
  },
  gridContainer: {
    flex: 1,
    marginTop: 20,
  },
  gridRow: {
    flexDirection: 'row',
  },
  cellContainer: {
    width: 110,
    height: 70,
    marginHorizontal: 'auto',
  },
  cell: {
    fontSize: 35,
    textAlign: 'center',
    color: Colors.input.pink,
  },
  deleteCell: {
    marginLeft: (110 - 32) / 2,
    marginTop: 10,
    padding: 0,
  },
});
