import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { AuthStack } from '../../../auth/presentation/navigation';

export const RootStack = () => {
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);
  return accessToken ? <Text>HOME</Text> : <AuthStack />;
};
