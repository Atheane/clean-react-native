import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';
import { initializeApplication } from '../../../shared/application/commands/initialization';

export const RootStack = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  return <Text>Loading</Text>;
};
