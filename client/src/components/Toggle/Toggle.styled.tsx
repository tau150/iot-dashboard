import styled from "styled-components";

interface ToggleItemProps {
  selected?: boolean;
  color?: string;
}

export const ToggleBody = styled.div`
  display: inline-flex;
  height: 20px;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  box-shadow:
    1px 1.5px 4px 0px rgba(0, 0, 0, 0.1) inset,
    1px 1.5px 4px 0px rgba(0, 0, 0, 0.08) inset,
    0px -0.5px 1px 0px rgba(255, 255, 255, 0.25) inset,
    0px -0.5px 1px 0px rgba(255, 255, 255, 0.3) inset;
`;

export const ToggleItem = styled.button<ToggleItemProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  padding: 5px 10px;
  transition: background 500ms ease-in;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  align-items: center;
  border-radius: 100px;
  color: ${(props) => (props.selected ? "#fff" : "rgba(255, 255, 255, 0.6)")};
  opacity: ${(props) => (props.selected ? "1" : "0.8")};
  background: ${(props) => (props.selected ? props.color ?? props.theme.colors.accent : "none")};
  font-weight: ${(props) => (props.selected ? "700" : "400")};
`;
