import React, { ReactElement } from "react";

import { SensorModel, SensorActionStatus } from "../../model/Sensor";
import { Toggle } from "../Toggle/Toggle";
import { theme } from "../../theme";

import { Card, CardTitle, ValuesContent } from "./SensorCard.styled";

interface Props {
  sensor: SensorModel;
  onCheckboxClick: (sensorId: string, status: SensorActionStatus) => void;
}

const options = [
  { label: "Connect", color: theme.colors.success, value: SensorActionStatus.CONNECTED },
  { label: "Disconnect", color: theme.colors.warning, value: SensorActionStatus.DISCONNECT },
];

const SensorCard = React.memo(
  ({ sensor, onCheckboxClick }: Props): ReactElement => {
    const handleClick = (toggleValue: SensorActionStatus) => {
      onCheckboxClick(sensor.id, toggleValue);
    };

    const isConnected = sensor.connected;

    return (
      <Card $isConnected={isConnected} style={{ animationDuration: "1s" }}>
        <Toggle<SensorActionStatus>
          activeOption={isConnected ? SensorActionStatus.CONNECTED : SensorActionStatus.DISCONNECT}
          options={options}
          onToggleClick={handleClick}
        />
        <ValuesContent $isConnected={isConnected}>
          {sensor.value ?? "-"} {sensor.unit}
        </ValuesContent>
        <CardTitle $isConnected={isConnected}>{sensor.name}</CardTitle>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.sensor.value === nextProps.sensor.value) {
      return true;
    }

    return false;
  },
);

export default SensorCard;

SensorCard.displayName = "SensorCard";
