/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import Constants from 'expo-constants';
import { ILogger } from '../../src/expo/types';

export class Logger implements ILogger {
  private static instance: Logger | undefined;
  private env: string;

  private constructor(env: string) {
    this.env = env;
  }

  public static getInstance(env = Constants.expoConfig?.extra?.NODE_ENV): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(env);
    }
    return Logger.instance;
  }

  public static destroy(): void {
    if (Logger.instance) {
      Logger.instance = undefined;
    }
  }

  public debug(primaryMessage: any, ...supportingDetails: any[]): void {
    if (this.env !== 'production') {
      this.emitLogMessage('debug', primaryMessage, supportingDetails);
    }
  }
  public info(primaryMessage: any, ...supportingDetails: any[]): void {
    if (this.env !== 'production') {
      this.emitLogMessage('info', primaryMessage, supportingDetails);
    }
  }
  public warn(primaryMessage: any, ...supportingDetails: any[]): void {
    this.emitLogMessage('warn', primaryMessage, supportingDetails);
  }
  public error(primaryMessage: any, ...supportingDetails: any[]): void {
    this.emitLogMessage('error', primaryMessage, supportingDetails);
  }

  private emitLogMessage(
    msgType: 'debug' | 'info' | 'warn' | 'error',
    message: any,
    supportingDetails: any[],
  ): void {
    if (supportingDetails.length > 0) {
      console[msgType](message, ...supportingDetails);
    } else {
      console[msgType](message);
    }
  }
}
