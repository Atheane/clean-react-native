export interface IDomainError<EnumCodeError, EnumMessageError> {
  code: EnumCodeError;
  message: EnumMessageError;
  cause?: unknown;
}
