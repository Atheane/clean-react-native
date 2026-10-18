import { PdfViewer } from '@clean-rn/ui-mobile';

type IProps = {
  url: string;
};

export const Webview = (props: IProps) => <PdfViewer url={props.url} />;
