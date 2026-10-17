export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
export interface IInfraError {
  message: string;
  code: string;
  cause?: any;
}
