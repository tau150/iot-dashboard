import { ReactElement, useState } from "react";

import { ToggleBody, ToggleItem } from "./Toggle.styled";

interface Option<T> {
  label: string;
  value: T;
  color?: string;
}

interface Props<T = string> {
  options: Option<T>[];
  onToggleClick: (id: T) => void;
  activeOption?: T;
  color?: string;
}

export const Toggle = function <T = string>({
  activeOption,
  options,
  onToggleClick,
}: Props<T>): ReactElement {
  const [activeItem, setActiveItem] = useState<T>(activeOption || options[0].value);

  const handleClick = (item: T) => {
    if (item !== activeItem) {
      setActiveItem(item);
      onToggleClick(item);
    }
  };

  return (
    <ToggleBody>
      {options.map((option) => (
        <ToggleItem
          key={option.label}
          color={option.color}
          selected={activeItem === option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </ToggleItem>
      ))}
    </ToggleBody>
  );
};
