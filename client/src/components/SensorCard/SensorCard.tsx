import React, { ReactElement } from "react";

import { SensorModel, SensorActionStatus } from "../../model/Sensor";
import { theme } from "../../theme";
import { CompoundToggle } from "../Toggle/CompoundToggle/CompoundToggle";
import { ToggleItem } from "../ToggleItem/ToggleItem";

import { Card, CardTitle, ValuesContent } from "./SensorCard.styled";

interface Props {
  sensor: SensorModel;
  onCheckboxClick: (sensorId: string, status: string) => void;
}

const SensorCard = React.memo(
  ({ sensor, onCheckboxClick }: Props): ReactElement => {
    const handleClick = (toggleValue: string) => {
      onCheckboxClick(sensor.id, toggleValue);
    };

    const isConnected = sensor.connected;
    const selectedItem = isConnected ? SensorActionStatus.CONNECTED : SensorActionStatus.DISCONNECT;

    return (
      <Card $isConnected={isConnected}>
        <CompoundToggle selectedItem={selectedItem}>
          <ToggleItem
            color={theme.colors.success}
            value={SensorActionStatus.CONNECTED}
            onClick={handleClick}
          >
            Connect
          </ToggleItem>
          <ToggleItem
            color={theme.colors.warning}
            value={SensorActionStatus.DISCONNECT}
            onClick={handleClick}
          >
            Disconnect
          </ToggleItem>
        </CompoundToggle>
        <ValuesContent $isConnected={isConnected}>
          {sensor.value ?? sensor.prevValue} {sensor.unit}
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
