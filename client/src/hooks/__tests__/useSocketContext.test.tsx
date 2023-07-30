import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { PropsWithChildren } from "react";
import { expect } from "vitest";

import { SocketContextProvider } from "../../contexts/SocketContext";
import { useSocketContext } from "../useSocketContext";

const mockedSend = vi.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.spyOn(window, "WebSocket").mockReturnValue({ send: mockedSend } as any);

describe("SocketContextProvider", () => {
  it("should return initial values", () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SocketContextProvider>{children}</SocketContextProvider>
    );

    const { result } = renderHook(() => useSocketContext(), { wrapper });

    expect(result.current.isError).toBe(false);
    expect(result.current.sendMessage).toEqual(expect.any(Function));
    expect(result.current.addListener).toEqual(expect.any(Function));
  });

  it("should call send method from socket", async () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <SocketContextProvider>{children}</SocketContextProvider>
    );

    const { result } = renderHook(() => useSocketContext(), { wrapper });

    act(() => {
      result.current.addListener(vi.fn());
    });

    await waitFor(() => {
      result.current.sendMessage("test message");

      expect(mockedSend).toHaveBeenCalledWith("test message");
    });
  });
});
