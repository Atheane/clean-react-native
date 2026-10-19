export interface ILogger {
  debug(primaryMessage: string, ...supportingDetails: any[]): void;
  info(primaryMessage: string, ...supportingDetails: any[]): void;
  warn(primaryMessage: string, ...supportingDetails: any[]): void;
  error(primaryMessage: string, ...supportingDetails: any[]): void;
}
