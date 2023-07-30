import styled, { keyframes } from "styled-components";

interface SensorCardProps {
  $isConnected?: boolean;
}

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Card = styled.div<SensorCardProps>`
  animation: ${fadeInAnimation} 1s;
  height: 270px;
  flex-basis: 270px;
  border-radius: 68px;
  margin: 3% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: ${(props) => (props.$isConnected ? "0px 10px 50px 0px rgba(0, 0, 0, 0.18)" : "none")};
  background: ${(props) => (props.$isConnected ? "none" : "rgba(128, 128, 128, 0.1)")};
`;

export const ValuesContent = styled.p<SensorCardProps>`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  opacity: ${(props) => (props.$isConnected ? "1" : "0.4")};
`;

export const CardTitle = styled.h5<SensorCardProps>`
  margin: 0;
  font-size: 1.6rem;
  opacity: ${(props) => (props.$isConnected ? "1" : "0.4")};
`;
