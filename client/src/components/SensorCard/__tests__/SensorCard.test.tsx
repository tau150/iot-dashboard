import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import SensorCard from "../SensorCard";
import { render, screen } from "../../../utils/testUtils";
import { SensorActionStatus } from "../../../model/Sensor";

const NAME = "fake sensor";
const UNIT = "%";
const SENSOR = {
  id: "1",
  name: NAME,
  connected: false,
  unit: UNIT,
  value: null,
};

const mockedOnCheckboxClick = vi.fn();

describe("SensorCard", () => {
  it("should render properly when sensor is disconnected", () => {
    render(<SensorCard sensor={SENSOR} onCheckboxClick={mockedOnCheckboxClick} />);

    expect(screen.getByText(NAME)).toBeInTheDocument();
  });

  it("should render properly when sensor is connected", () => {
    const VALUE = 200;

    const newSensor = { ...SENSOR, value: VALUE };

    render(<SensorCard sensor={newSensor} onCheckboxClick={mockedOnCheckboxClick} />);

    expect(screen.getByText(NAME)).toBeInTheDocument();
    expect(screen.getByText(`${VALUE} ${UNIT}`)).toBeInTheDocument();
  });

  it("should call the correct method when toggle is clicked", async () => {
    const user = userEvent.setup();
    const VALUE = 200;
    const CONNECTED = true;
    const newSensor = { ...SENSOR, value: VALUE, connected: CONNECTED };

    render(<SensorCard sensor={newSensor} onCheckboxClick={mockedOnCheckboxClick} />);

    const disconnectOption = screen.getByText("Disconnect");

    await user.click(disconnectOption);

    expect(mockedOnCheckboxClick).toHaveBeenCalledWith(SENSOR.id, SensorActionStatus.DISCONNECT);
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
  });
});
