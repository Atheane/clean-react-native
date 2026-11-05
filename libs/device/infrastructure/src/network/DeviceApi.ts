import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { Device, IDeviceRepository, IDeviceProperties } from '@clean-rn/device/domain';
import { IDevicePropertiesServer } from '../types';

export class DeviceApi implements IDeviceRepository {
  private static instance: DeviceApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.createDevice = this.createDevice.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): DeviceApi {
    if (!this.instance) {
      this.instance = new DeviceApi(httpConnection);
    }
    return this.instance;
  }

  async createDevice({
    deviceId,
    ...deviceProps
  }: IDeviceProperties & { deviceId: string }): Promise<Device> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/device`,
      this.connection.options(IHttpVerb.POST, { deviceId, ...deviceProps }),
    );
    await this.connection.handleError(response);
    const deviceServer: IDevicePropertiesServer = await response.json();
    const deviceResponse = Device.Create({
      deviceId: deviceServer.deviceId,
      userId: deviceServer.userId.toString(),
    });
    deviceResponse.registerDeviceProperties({
      brand: deviceServer.brand,
      model: deviceServer.model,
      os: deviceServer.os,
      osVersion: deviceServer.osVersion,
    });
    if (deviceServer.firebaseId) {
      deviceResponse.connectToNotifications(deviceServer.firebaseId);
    }
    deviceResponse.addAppVersion(deviceServer.appVersion);
    return deviceResponse;
  }
}
