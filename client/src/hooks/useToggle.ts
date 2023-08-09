import { useContext } from "react";

import { ToggleContext } from "../components/Toggle/CompoundToggle/CompoundToggle";

export const useToggle = () => {
  const context = useContext(ToggleContext);

  if (context === undefined) {
    throw new Error(`useToggle must be used within a ToggleContext`);
  }

  return context;
};
