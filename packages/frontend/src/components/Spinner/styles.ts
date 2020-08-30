import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size: number;
  color: string;
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerComponent = styled.div<SpinnerProps>`
  margin: 0 !important;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${({ color }) => color};
  border-right: 2px solid ${({ color }) => color};
  border-bottom: 2px solid ${({ color }) => color};
  border-left: 2px solid transparent;
  background: transparent;
  min-width: ${({ size }) => `${size}px`};
  min-height: ${({ size }) => `${size}px`};
  border-radius: 50%;
`;
