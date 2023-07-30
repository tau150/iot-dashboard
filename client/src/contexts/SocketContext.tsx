import {
  useRef,
  createContext,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
  useMemo,
} from "react";

import { SOCKET_URL } from "../constants";

import type { SensorModel } from "../model/Sensor";

type Listener = (data: SensorModel) => void;
type Listeners = Listener[];

interface ContextInitialValue {
  isError: boolean;
  sendMessage: (data: string) => void;
  addListener: (fn: Listener) => void;
}

const initialValue = {
  isError: false,
  sendMessage: (_data: string) => undefined,
  addListener: (_fn: Listener) => undefined,
};

export const SocketContext = createContext<ContextInitialValue>(initialValue);

export const SocketContextProvider = (props: PropsWithChildren): ReactElement => {
  const [isError, setIsError] = useState(false);
  const [listeners, setListeners] = useState<Listeners>([]);
  const socketConnection = useRef<null | WebSocket>(null);

  const sendMessage = (data: string) => {
    socketConnection.current?.send(data);
  };

  const addListener = (fn: Listener) => {
    setListeners((prevState) => [...prevState, fn]);
  };

  useEffect(() => {
    let ws: WebSocket | undefined;

    if (listeners.length > 0) {
      ws = new WebSocket(SOCKET_URL);

      ws.onerror = () => setIsError(true);

      ws.onmessage = (message) => {
        listeners.forEach((listener) => listener(JSON.parse(message.data)));
      };

      socketConnection.current = ws;
    }

    return () => {
      if (ws?.readyState === 1) {
        ws.close();
      }
    };
  }, [listeners]);

  const value = useMemo(
    () => ({
      sendMessage,
      isError,
      addListener,
    }),
    [isError],
  );

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};
