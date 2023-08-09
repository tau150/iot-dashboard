import { useEffect, useState, useRef, useCallback, useMemo } from "react";

import { ErrorSection } from "../components/ErrorSection/ErrorSection";
import { useSocketContext } from "../hooks/useSocketContext";
import { SensorCardWrapper } from "../components/SensorCard/SensorCardWrapper";
import { Header } from "../components/Header/Header";
import { Filters } from "../model/Sensor";

import { mergeState } from "./Dashboard.utils";
import {
  MainContainer,
  ContentContainer,
  CardsContainer,
  NoDataTitleContainer,
} from "./Dashboard.styled";

import type { SensorModel } from "../model/Sensor";

function Dashboard() {
  const [filter, setFilter] = useState<string>(Filters.ALL);
  const [sensorsList, setSensorsList] = useState<Record<string, SensorModel>>({});
  const { sendMessage, isError, addListener, removeListener } = useSocketContext();

  const handleFilterSelection = useCallback((filter: string) => {
    setFilter(filter);
  }, []);

  const isReceivingData = useRef(false);

  useEffect(() => {
    const getSensorsList = (data: SensorModel) => {
      if (!isReceivingData.current) {
        isReceivingData.current = true;
      }
      setSensorsList((prevState) => mergeState(prevState, data));
    };

    addListener(getSensorsList);

    return () => removeListener(getSensorsList);
  }, [addListener, removeListener]);

  const handleCheckboxClick = (id: string, value: string): void => {
    sendMessage(JSON.stringify({ command: value, id }));
  };

  const filteredSensors = useMemo(() => {
    const sensorsAsArray = Object.values(sensorsList);

    return filter === Filters.ALL
      ? sensorsAsArray
      : sensorsAsArray.filter((sensor) => sensor.connected);
  }, [filter, sensorsList]);

  if (isError) {
    return <ErrorSection />;
  }

  return (
    <MainContainer>
      <ContentContainer>
        <Header handleFilterSelection={handleFilterSelection} />
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

export { Dashboard };
