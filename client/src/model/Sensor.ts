type SensorValue = null | number;

export interface SensorModel {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: SensorValue;
  prevValue: SensorValue;
}

export enum SensorActionStatus {
  CONNECTED = "connect",
  DISCONNECT = "disconnect",
}

export enum Filters {
  ALL = "ALL",
  CONNECTED = "CONNECTED",
}
