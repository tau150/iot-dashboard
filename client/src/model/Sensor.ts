export interface SensorModel {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: null | number;
}

export enum SensorActionStatus {
  CONNECTED = "connect",
  DISCONNECT = "disconnect",
}
