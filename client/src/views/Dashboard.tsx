import { useEffect, useState, useRef } from "react";

import { ErrorSection } from "../components/ErrorSection/ErrorSection";
import { SensorActionStatus } from "../model/Sensor";
import { Toggle } from "../components/Toggle/Toggle";
import { useSocketContext } from "../hooks/useSocketContext";
import { SensorCardWrapper } from "../components/SensorCard/SensorCardWrapper";

import { mergeState } from "./Dashboard.utils";
import {
  MainContainer,
  ContentContainer,
  MainTitle,
  CardsContainer,
  ToggleWrapper,
  NoDataTitleContainer,
} from "./Dashboard.styled";

import type { SensorModel } from "../model/Sensor";

enum ToggleOptions {
  ALL = "ALL",
  CONNECTED = "CONNECTED",
}

const toggleOptions = [
  { label: "All", value: ToggleOptions.ALL },
  { label: "Connected", value: ToggleOptions.CONNECTED },
];

export function Dashboard() {
  const [filter, setFilter] = useState(ToggleOptions.ALL);
  const [sensorsList, setSensorsList] = useState<SensorModel[] | []>([]);

  const { sendMessage, isError, addListener } = useSocketContext();

  const isReceivingData = useRef(false);

  const getSensorsList = (data: SensorModel) => {
    if (!isReceivingData.current) {
      isReceivingData.current = true;
    }
    setSensorsList((prevState) => mergeState(prevState, data));
  };

  useEffect(() => {
    addListener(getSensorsList);
  }, [addListener]);

  const handleCheckboxClick = (id: string, value: SensorActionStatus): void => {
    sendMessage(JSON.stringify({ command: value, id }));
  };

  const handleClickToggleConnected = (selectedFilter: ToggleOptions) => {
    setFilter(selectedFilter);
  };

  if (isError) {
    return <ErrorSection />;
  }

  const filteredSensors =
    filter === ToggleOptions.ALL ? sensorsList : sensorsList.filter((sensor) => sensor.connected);

  return (
    <MainContainer>
      <ContentContainer>
        <MainTitle>IoT Sensors Dashboard</MainTitle>
        <ToggleWrapper>
          <Toggle<ToggleOptions>
            activeOption={filter}
            options={toggleOptions}
            onToggleClick={handleClickToggleConnected}
          />
        </ToggleWrapper>
        {isReceivingData.current &&
          (filteredSensors.length > 0 ? (
            <CardsContainer>
              {filteredSensors.map((sensor) => {
                return (
                  <SensorCardWrapper
                    key={sensor.id}
                    sensor={sensor}
                    onCheckboxClick={handleCheckboxClick}
                  />
                );
              })}
            </CardsContainer>
          ) : (
            <NoDataTitleContainer>
              <h2>There are no connected sensors, switch to All to see all sensors</h2>
            </NoDataTitleContainer>
          ))}
      </ContentContainer>
    </MainContainer>
  );
}
