import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { AuthStack } from '../../../auth/presentation/navigation';

export const RootStack = () => {
  // const { email } = useSelector((state: IRootState) => state.initialization);

  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);
  const email = null;
  return accessToken ? (
    <Text>HOME</Text>
  ) : (
    <AuthStack initRoute={email ? IAuthStackPages.LOGIN : IAuthStackPages.SIGNUP_EMAIL} />
  );
};
