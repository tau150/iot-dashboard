import { PropsWithChildren } from "react";

import { ToggleItem as ToggleItemStyled } from "../Toggle/Toggle.styled";
import { useToggle } from "../../hooks/useToggle";
import { theme } from "../../theme";
interface Props {
  value: string;
  onClick: (value: string) => void;
  color?: string;
}

export function ToggleItem({
  value,
  color = theme.colors.accent,
  children,
  onClick,
}: PropsWithChildren<Props>) {
  const { activeItem, setActiveItem } = useToggle();

  const handleClick = () => {
    setActiveItem(value);
    onClick(value);
  };

  return (
    <ToggleItemStyled color={color} selected={activeItem === value} onClick={handleClick}>
      {children}
    </ToggleItemStyled>
  );
}
