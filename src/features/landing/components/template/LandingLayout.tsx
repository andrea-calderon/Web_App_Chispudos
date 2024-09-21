import React from 'react';

import { ReactNode } from 'react';
import ResponsiveAppBar from '../organisms/AppBar';

interface Props {
  children: ReactNode;
}

export const LandingLayout = ({ children }: Props) => {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
    </div>
  );
};
