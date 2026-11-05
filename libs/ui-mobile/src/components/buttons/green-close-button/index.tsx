import { FC } from 'react';
import { Button, ButtonProps } from '@rneui/themed';

import { CloseBg } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  onPress: () => void;
};

export const GreenCloseButton: FC<ButtonProps & IProps> = (props: ButtonProps & IProps) => {
  return (
    <Button type="clear" onPress={props.onPress}>
      <CloseBg
        width={30}
        height={30}
        startColor={Colors.primary.lightGreen}
        endColor={Colors.primary.green}
        style={{
          marginLeft: -10,
        }}
      />
    </Button>
  );
};
