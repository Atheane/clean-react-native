// import { useSelector } from 'react-redux';
// import { RootState } from '@shared/infrastructure/redux/reducers';
// import { AuthStack } from '@auth/presentation/navigation';
// import { AUTH_STACK_PAGES } from '../../types';

// export const RootStack = () => {
//   const { email } = useSelector((state: RootState) => state.storage);

//   const {
//     auth: { accessToken },
//   } = useSelector((state: RootState) => state.auth.login);

//   return accessToken ? (
//     <AuthStack initRoute={email ? AUTH_STACK_PAGES.LOGIN : AUTH_STACK_PAGES.SIGNUP_STEP1} />
//   ) : (
//     <AuthStack initRoute={email ? AUTH_STACK_PAGES.LOGIN : AUTH_STACK_PAGES.SIGNUP_STEP1} />
//   );
// };

import { Text } from 'react-native';
export const RootStack = () => {
  return <Text> Rootstack </Text>;
};
