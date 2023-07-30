import { SensorModel } from "../model/Sensor";

export const mergeState = (state: SensorModel[] | [], data: SensorModel): SensorModel[] => {
  const existingElementIndex = state.findIndex((el) => el.id === data.id);

  if (existingElementIndex !== -1) {
    const newState = [...state];

    newState[existingElementIndex] = data;

    return newState;
  }

  return [...state, data];
};
