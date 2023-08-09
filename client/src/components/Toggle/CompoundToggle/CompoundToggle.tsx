import { ReactElement, useState, PropsWithChildren, createContext } from "react";

import { ToggleBody } from "../Toggle.styled";

interface Props {
  selectedItem?: string;
}

interface InitContext {
  activeItem: undefined | string;
  setActiveItem: (item: string) => void;
}

const initContextValue = {
  activeItem: undefined,
  setActiveItem: (_item: string) => undefined,
};

const ToggleContext = createContext<InitContext>(initContextValue);

const CompoundToggle = ({ children, selectedItem }: PropsWithChildren<Props>): ReactElement => {
  const [activeItem, setActiveItem] = useState<undefined | string>(selectedItem);

  const handleSetActiveItem = (item: string) => {
    if (item !== activeItem) {
      setActiveItem(item);
    }
  };

  return (
    <ToggleContext.Provider value={{ activeItem, setActiveItem: handleSetActiveItem }}>
      <ToggleBody>{children}</ToggleBody>
    </ToggleContext.Provider>
  );
};

CompoundToggle.displayName = "CompoundToggle";

export { ToggleContext, CompoundToggle };
