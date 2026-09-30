'use client';
import { useTheme } from '../../Theme/Theme';

export const CharacterDetailsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentTheme = useTheme();

  return (
    <div className={`characterDetails characterDetails-${currentTheme.theme}`}>
      {children}
    </div>
  );
};
