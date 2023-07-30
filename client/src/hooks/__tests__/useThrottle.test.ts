import { vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useThrottle } from "../useThrottle";

vi.useFakeTimers();

describe("useThrottle hook", () => {
  it("should return the initial value immediately when isImmediateReturn is true", () => {
    const initialValue = "Initial Value";

    const { result } = renderHook(() =>
      useThrottle({ value: initialValue, isImmediateReturn: true, interval: 1000 }),
    );

    const throttledValue = result.current;

    expect(throttledValue).toEqual(initialValue);
  });

  it("should return the updated value after the interval has passed", () => {
    const initialValue = "Initial Value";
    const updatedValue = "Updated Value";

    const { result, rerender } = renderHook(({ value }) => useThrottle({ value, interval: 1000 }), {
      initialProps: { value: initialValue },
    });

    const throttledValue = () => result.current;

    act(() => {
      rerender({ value: updatedValue });
    });

    expect(throttledValue()).toEqual(initialValue);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(throttledValue()).toEqual(updatedValue);
  });
});
