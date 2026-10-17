import { Validate } from '../../../assets';
import { PrimaryButton } from '../primary-button';

type IProps = {
  title: string;
  uppercase: boolean;
  loading?: boolean;
  disabled?: boolean;
  onSubmit: () => void;
};

export const SubmitButton = (props: IProps) => (
  <PrimaryButton
    large
    iconOne={Validate}
    title={props.title}
    uppercase={props.uppercase}
    loading={props.loading}
    onPress={props.onSubmit}
    disabled={props.disabled}
  />
);
