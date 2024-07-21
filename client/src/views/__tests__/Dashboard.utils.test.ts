import { expect } from "vitest";

import { mergeState } from "../Dashboard.utils";

import type { SensorModel } from "../../model/Sensor";

describe("Dashboard Utils", () => {
  describe("mergeState ", () => {
    it("should merge an element into the state when it does not exist in the array", () => {
      const state = {
        "1": {
          id: "1",
          name: "Sensor 1",
          value: 10,
          connected: false,
          unit: "%",
          prevValue: null,
        },
        "2": {
          id: "2",
          name: "Sensor 2",
          value: 20,
          connected: false,
          unit: "%",
          prevValue: null,
        },
      };

      const data: SensorModel = {
        id: "3",
        name: "Sensor 3",
        value: 30,
        connected: false,
        unit: "%",
        prevValue: null,
      };

      const newState = mergeState(state, data);

      expect(newState).toStrictEqual({ ...state, [data.id]: { ...data, prevValue: undefined } });
    });

    it("should update an existing element in the state", () => {
      const state = {
        "1": {
          id: "1",
          name: "Sensor 1",
          value: null,
          connected: false,
          unit: "%",
          prevValue: null,
        },
        "2": {
          id: "2",
          name: "Sensor 2",
          value: null,
          connected: false,
          unit: "%",
          prevValue: null,
        },
      };

      const data: SensorModel = {
        id: "2",
        name: "Sensor 2",
        value: 25,
        connected: true,
        unit: "%",
        prevValue: null,
      };

      const newState = mergeState(state, data);

      expect(newState["2"].value).toBe(25);
      expect(newState["2"].connected).toBe(true);
    });

    it.only("should return the same state when no changes are made", () => {
      const state = {
        "1": {
          id: "1",
          name: "Sensor 1",
          value: null,
          connected: false,
          unit: "%",
          prevValue: null,
        },
        "2": {
          id: "2",
          name: "Sensor 2",
          value: null,
          connected: false,
          unit: "%",
          prevValue: null,
        },
      };

      const data: SensorModel = {
        id: "1",
        name: "Sensor 1",
        value: null,
        connected: false,
        unit: "%",
        prevValue: null,
      };

      const newState = mergeState(state, data);

      expect(newState).toStrictEqual(state);
    });
  });
});
