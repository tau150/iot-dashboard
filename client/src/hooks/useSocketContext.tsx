import { useContext } from "react";

import { SocketContext } from "../contexts/SocketContext";

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error(`useSocketConnection must be used within a SocketContextProvider`);
  }

  return context;
};
