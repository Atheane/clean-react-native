import { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react-native';
import { TFunction } from 'i18next';

import { ModalError } from '@clean-rn/ui-mobile';

type IProps = {
  children: ReactNode;
  t: TFunction<'translation', undefined>;
};

type IState = {
  error: Error | null;
  hasError: boolean;
};

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(_: Error): IState {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    error.stack = errorInfo.componentStack;
    this.setState({ hasError: true, error });
    console.error(error);
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError && this.state.error !== null) {
      return <ModalError error={this.state.error} />;
    }

    return this.props.children;
  }
}
