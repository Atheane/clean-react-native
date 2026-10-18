import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { AuthStack } from '../../../auth/presentation/navigation';

export const RootStack = () => {
  const { email } = useSelector((state: RootState) => state.initialization);

  const {
    auth: { accessToken },
  } = useSelector((state: RootState) => state.auth.login);

  return accessToken ? (
    <Text>HOME</Text>
  ) : (
    <AuthStack initRoute={email ? IAuthStackPages.LOGIN : IAuthStackPages.SIGNUP_STEP1} />
  );
};
