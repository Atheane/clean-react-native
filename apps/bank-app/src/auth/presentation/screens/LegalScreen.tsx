import { PdfViewer } from '@clean-rn/ui-mobile';
import { pdfUrls } from '../constants';

export const LegalScreen = () => <PdfViewer url={pdfUrls.legal} />;
