import { SensorModel } from "../model/Sensor";

export const mergeState = (
  state: Record<string, SensorModel>,
  data: SensorModel,
): Record<string, SensorModel> => {
  return { ...state, [data.id]: { ...data, prevValue: state?.[data.id]?.value } };
};
