import React from 'react';

import { SpinnerComponent } from './styles';

interface SpinnerComponent {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerComponent> = ({
  size = 24,
  color = '#0a0a0a',
}: SpinnerComponent) => <SpinnerComponent size={size} color={color} />;

export default Spinner;
