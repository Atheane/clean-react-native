import { FC } from 'react';
import { Button, ButtonProps } from '@rneui/themed';

import { LeftChevron } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  onPress: () => void;
};

export const GreenBackButton: FC<ButtonProps & IProps> = (props: ButtonProps & IProps) => {
  return (
    <Button type="clear" onPress={props.onPress}>
      <LeftChevron width={16} height={26} color={Colors.primary.lightGreen} />
    </Button>
  );
};
