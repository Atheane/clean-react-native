export interface IDomainError<EnumCodeError, EnumMessageError> {
  code: EnumCodeError; // todo add enum for other bounded context
  message: EnumMessageError;
  cause?: unknown;
}
