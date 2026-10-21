import { Entity } from '@clean-rn/ddd';
import { IRegisterDeviceCommand } from '../commands';

export interface IDeviceProperties {
  appVersion: string;
  firebaseId: string;
  brand: string;
  model: string;
  os: string;
  osVersion: string;
  tag: string;
  userId: string;
}

export class Device extends Entity<IDeviceProperties> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<IDeviceProperties> }) {
    super({ id, properties });
  }

  static Create({ deviceId, userId }: { deviceId: string; userId: string }): Device {
    return new Device({ id: deviceId, properties: { userId } });
  }

  registerDeviceProperties(cmd: IRegisterDeviceCommand): void {
    const { brand, model, os, osVersion } = cmd;
    this.properties = {
      brand,
      model,
      os,
      osVersion,
    };
  }

  connectToNotifications(firebaseId: string): void {
    this.properties.firebaseId = firebaseId;
  }

  addTag(tag: string): void {
    this.properties.tag = tag;
  }

  addAppVersion(appVersion: string): void {
    this.properties.appVersion = appVersion;
  }
}
