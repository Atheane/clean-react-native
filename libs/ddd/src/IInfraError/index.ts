export interface IInfraError {
  code: string;
  message: string;
  cause?: unknown;
}

//todo definie IInfraError codes and messages
// export interface IInfraError<EnumCodeError, EnumMessageError> {
//   code: EnumCodeError;
//   message: EnumMessageError;
//   cause?: unknown;
// }
