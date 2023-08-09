import { useCallback } from "react";

import { useThrottle } from "../../hooks/useThrottle";

import SensorCard from "./SensorCard";

import type { SensorModel } from "../../model/Sensor";

interface Props {
  sensor: SensorModel;
  onCheckboxClick: (sensorId: string, status: string) => void;
}

export const SensorCardWrapper = ({ sensor, onCheckboxClick }: Props) => {
  const isImmediateReturn = sensor.connected === false;
  const immediateReturnCb = useCallback((prevState: SensorModel, value: SensorModel) => {
    return {
      ...value,
      prevValue: prevState.value,
    };
  }, []);
  const throttledSensor = useThrottle<SensorModel>({
    value: sensor,
    immediateReturnCb,
    isImmediateReturn,
  });

  return <SensorCard sensor={throttledSensor} onCheckboxClick={onCheckboxClick} />;
};
