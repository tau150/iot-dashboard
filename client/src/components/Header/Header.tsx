import { memo } from "react";

import { ToggleWrapper, MainTitle } from "../../views/Dashboard.styled";
import { CompoundToggle } from "../Toggle/CompoundToggle/CompoundToggle";
import { ToggleItem } from "../ToggleItem/ToggleItem";
import { Filters } from "../../model/Sensor";

interface Props {
  handleFilterSelection: (value: string) => void;
}

export const Header = memo(({ handleFilterSelection }: Props) => {
  return (
    <>
      <MainTitle>IoT Sensors Dashboard</MainTitle>
      <ToggleWrapper>
        <CompoundToggle selectedItem={Filters.ALL}>
          <ToggleItem value={Filters.ALL} onClick={handleFilterSelection}>
            All
          </ToggleItem>
          <ToggleItem value={Filters.CONNECTED} onClick={handleFilterSelection}>
            Connected
          </ToggleItem>
        </CompoundToggle>
      </ToggleWrapper>
    </>
  );
});

Header.displayName = "Header";
