import { expect } from "vitest";

import { mergeState } from "../Dashboard.utils";

import type { SensorModel } from "../../model/Sensor";

describe("Dashboard Utils", () => {
  describe("mergeState ", () => {
    it("should merge an element into the state when it does not exist in the array", () => {
      const state: SensorModel[] = [
        { id: "1", name: "Sensor 1", value: 10, connected: false, unit: "%" },
        { id: "2", name: "Sensor 2", value: 20, connected: false, unit: "%" },
      ];
      const data: SensorModel = {
        id: "3",
        name: "Sensor 3",
        value: 30,
        connected: false,
        unit: "%",
      };

      const newState = mergeState(state, data);

      expect(newState).toHaveLength(3);
      expect(newState).toContain(data);
    });

    it("should update an existing element in the state", () => {
      const state: SensorModel[] = [
        { id: "1", name: "Sensor 1", value: null, connected: false, unit: "%" },
        { id: "2", name: "Sensor 2", value: null, connected: false, unit: "%" },
      ];
      const data: SensorModel = {
        id: "2",
        name: "Sensor 2",
        value: 25,
        connected: true,
        unit: "%",
      };

      const newState = mergeState(state, data);

      expect(newState).toHaveLength(2);
      expect(newState).toContain(data);
      expect(newState[1].value).toBe(25);
      expect(newState[1].connected).toBe(true);
    });

    it("should return the same state when no changes are made", () => {
      const state: SensorModel[] = [
        { id: "1", name: "Sensor 1", value: null, connected: false, unit: "%" },
        { id: "2", name: "Sensor 2", value: null, connected: false, unit: "%" },
      ];
      const data: SensorModel = {
        id: "1",
        name: "Sensor 1",
        value: null,
        connected: false,
        unit: "%",
      };

      const newState = mergeState(state, data);

      expect(newState).toStrictEqual(state);
    });
  });
});
