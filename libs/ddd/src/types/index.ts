export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export interface IDomainError<EnumCodeError, EnumMessageError> {
  code: EnumCodeError;
  message: EnumMessageError;
  cause?: unknown;
}

export interface IInfraError<EnumCodeError, EnumMessageError> {
  code: EnumCodeError;
  message: EnumMessageError;
  cause?: unknown;
}
