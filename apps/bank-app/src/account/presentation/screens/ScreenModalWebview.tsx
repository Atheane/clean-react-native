import { PdfViewer } from '@clean-rn/ui-mobile';
import { useRoute } from '@react-navigation/native';
import { BASE_URL } from '../constants';

export const ScreenModalWebview = () => {
  const {
    params: { uid },
  } = useRoute() as { params: { uid: string } };

  return <PdfViewer url={`${BASE_URL}/${uid}`} />;
};
