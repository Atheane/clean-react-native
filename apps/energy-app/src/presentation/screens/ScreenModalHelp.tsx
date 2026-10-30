import { useRoute } from '@react-navigation/native';

import { ModalContent, Question } from '@clean-rn/ui-mobile';
import { Colors } from '../constants';

export const ScreenModalHelp = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  return (
    <ModalContent
      title={uid}
      icon={() => <Question color={Colors.primary.grey} />}
      text={'lorem ipsum delatus lorem ipsum delatus lorem ipsum delatus'}
    />
  );
};
