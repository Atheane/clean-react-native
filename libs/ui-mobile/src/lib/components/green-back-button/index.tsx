import { FC } from 'react';
import { Image } from 'react-native';
import { Button, ButtonProps } from '@rneui/themed';
import { Back } from '../../assets';

type IProps = {
  onPress: () => void;
};

export const GreenBackButton: FC<ButtonProps & IProps> = (props: ButtonProps & IProps) => {
  return (
    <Button type="clear" onPress={props.onPress}>
      <Image source={Back} width={16} height={26} />
    </Button>
  );
};
