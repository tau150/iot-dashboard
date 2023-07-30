import { useThrottle } from "../../hooks/useThrottle";

import SensorCard from "./SensorCard";

import type { SensorModel, SensorActionStatus } from "../../model/Sensor";

interface Props {
  sensor: SensorModel;
  onCheckboxClick: (sensorId: string, status: SensorActionStatus) => void;
}

export const SensorCardWrapper = ({ sensor, onCheckboxClick }: Props) => {
  const isImmediateReturn = sensor.connected === false;
  const throttledSensor = useThrottle<SensorModel>({
    value: sensor,
    isImmediateReturn,
  });

  return <SensorCard sensor={throttledSensor} onCheckboxClick={onCheckboxClick} />;
};
