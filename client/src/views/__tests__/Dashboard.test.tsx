import { expect, vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";

import { render, screen } from "../../utils/testUtils";
import { Dashboard } from "../Dashboard";
import { SocketContextProvider } from "../../contexts/SocketContext";
import { useSocketContext } from "../../hooks/useSocketContext";

vi.mock("../../hooks/useSocketContext");

vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    useRef: () => ({ current: true }),
  };
});

describe("Dashboard component", async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (useSocketContext as Mock).mockReturnValue({
      sendMessage: vi.fn(),
      isError: false,
      addListener: vi.fn((cb) =>
        cb({ id: "1", name: "test", connected: false, unit: "%", value: 1000 }),
      ),
    });
  });

  it("renders the main title", () => {
    render(
      <SocketContextProvider>
        <Dashboard />
      </SocketContextProvider>,
    );

    const mainTitle = screen.getByText(/IoT Sensors Dashboard/i);

    expect(mainTitle).toBeInTheDocument();
  });

  it("renders error component when there was an error connecting to socket", () => {
    (useSocketContext as Mock).mockReturnValue({
      sendMessage: vi.fn(),
      isError: true,
      addListener: vi.fn(),
    });

    render(
      <SocketContextProvider>
        <Dashboard />,
      </SocketContextProvider>,
    );

    const error = screen.getByText(/Ooops!, something went wrong!/i);

    expect(error).toBeInTheDocument();
  });

  it("renders the no data message when there are no connected sensors", async () => {
    const user = userEvent.setup();

    (useSocketContext as Mock).mockReturnValue({
      sendMessage: vi.fn(),
      isError: false,
      addListener: vi.fn((cb) =>
        cb({ id: "1", name: "test", connected: false, unit: "%", value: 1000 }),
      ),
    });

    render(
      <SocketContextProvider>
        <Dashboard />
      </SocketContextProvider>,
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();
    const connectedFilter = screen.getByText(/Connected/i);

    await user.click(connectedFilter);

    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.getByText(/There are no connected sensors/i)).toBeInTheDocument();
  });

  it("should show just connected sensors when filter is applied", async () => {
    const user = userEvent.setup();

    (useSocketContext as Mock).mockReturnValue({
      sendMessage: vi.fn(),
      isError: false,
      addListener: vi.fn((cb) => {
        cb({ id: "1", name: "pressure", connected: false, unit: "%", value: null });
        cb({ id: "2", name: "temperature", connected: true, unit: "%", value: 1000 });
      }),
    });

    render(
      <SocketContextProvider>
        <Dashboard />
      </SocketContextProvider>,
    );

    expect(screen.getByText(/pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/temperature/i)).toBeInTheDocument();
    const connectedFilter = screen.getByText(/Connected/i);

    await user.click(connectedFilter);

    expect(screen.queryByText(/pressure/i)).not.toBeInTheDocument();
    expect(screen.getByText(/temperature/i)).toBeInTheDocument();
    expect(screen.queryByText(/There are no connected sensors/i)).not.toBeInTheDocument();
  });
});
