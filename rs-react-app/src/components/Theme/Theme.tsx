'use client';
import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext<{
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}>({ theme: 'light', setTheme: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext>
  );
};

export const useTheme = () => useContext(ThemeContext);
