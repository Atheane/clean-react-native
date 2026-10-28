import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { ModalContent, IPropsTouchEventCard } from '@clean-rn/ui-mobile';
import { eventsCardsContent } from '../constants';

export const ScreenModalContent = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  const [content, setContent] = useState<IPropsTouchEventCard>();
  useEffect(() => {
    eventsCardsContent.find((item) => {
      if (item.uid === uid) {
        setContent(item);
      }
      return false;
    });
  }, [uid]);

  return <ModalContent text={content?.text || ''} icon={content?.icon} imgWidth={200} imgHeight={200} />;
};
