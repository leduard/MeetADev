import React from 'react';

import { SpinnerComponent } from './styles';

interface SpinnerComponent {
  size?: number;
  color?: string;
  width?: number;
}

const Spinner: React.FC<SpinnerComponent> = ({
  size = 24,
  color = '#0a0a0a',
  width = 2,
}: SpinnerComponent) => (
  <SpinnerComponent size={size} color={color} width={width} />
);

export default Spinner;
