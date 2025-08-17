'use client';

import './mainWrapper.css';
import { useTheme } from '../Theme/Theme';

export const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const currentTheme = useTheme();

  return <main className={`main main-${currentTheme.theme}`}>{children}</main>;
};
