import { useCallback, useState } from 'react';

export const useTogglePress = (init: boolean) => {
  const [pressed, setPressed] = useState(init);

  const onPress = useCallback(() => {
    setPressed(!pressed);
  }, [pressed]);

  return { pressed, onPress };
};
