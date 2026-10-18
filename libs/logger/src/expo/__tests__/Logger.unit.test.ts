/* eslint-disable no-console */
import { Logger } from '../..';

describe('Logger', () => {
  afterEach(() => {
    Logger.destroy();
  });
  it('no instance, check that getInstance return an instance of Logger', () => {
    const logger = Logger.getInstance();
    expect(logger).toBeInstanceOf(Logger);
  });

  it('already instanced, check that getInstance return an instance of Logger', () => {
    Logger.getInstance();
    const logger2 = Logger.getInstance();
    expect(logger2).toBeInstanceOf(Logger);
  });

  it('check that debug does not log anything outside development environment', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance('production');
    logger.debug('msg');
    expect(console.debug).not.toHaveBeenCalled();
  });

  it('check that debug logs a message without extra parameters in development environment', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance('development');
    const message = 'msg';
    logger.debug(message);
    expect(console.debug).toHaveBeenCalledWith(message);
  });

  it('check that debug logs a message with extra parameters in development environment', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance('development');
    const message = 'msg';
    const details = { foo: 'bar' };
    logger.debug(message, details);
    expect(console.debug).toHaveBeenCalledWith(message, details);
  });

  it('check that info does not log anything outside development environment', () => {
    jest.spyOn(console, 'info').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance('production');
    logger.info('msg');
    expect(console.info).not.toHaveBeenCalled();
  });

  it('check that info logs a message without extra parameters in development environment', () => {
    jest.spyOn(console, 'info').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance('development');
    const message = 'msg';
    logger.info(message);
    expect(console.info).toHaveBeenCalledWith(message);
  });

  it('check that info logs a message with extra parameters in development environment', () => {
    jest.spyOn(console, 'info').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance('development');
    const message = 'msg';
    const details = { foo: 'bar' };
    logger.info(message, details);
    expect(console.info).toHaveBeenCalledWith(message, details);
  });

  it('check that warn logs a message without extra parameters', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance();
    const message = 'msg';
    logger.warn(message);
    expect(console.warn).toHaveBeenCalledWith(message);
  });

  it('check that warn logs a message with extra parameters', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance();
    const message = 'msg';
    const details = { foo: 'bar' };
    logger.warn(message, details);
    expect(console.warn).toHaveBeenCalledWith(message, details);
  });

  it('check that error logs a message without extra parameters', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      return;
    });
    const logger = Logger.getInstance();
    const message = 'msg';
    logger.error(message);
    expect(console.error).toHaveBeenCalledWith(message);
  });

  it('check that error logs a message with extra parameters', () => {
    const logger = Logger.getInstance();
    Logger.destroy();
    expect(logger).toBeInstanceOf(Logger);
  });
});
