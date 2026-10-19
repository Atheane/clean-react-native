import { ServerError } from '@clean-rn/shared/infrastructure';

export interface IGlobalErrorState {
  error: ServerError | Error | null;
}
