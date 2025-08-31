import { useEffect, useRef } from 'react';

interface CellHighlightedProps {
  newValue: number | string;
  isHighlighted: boolean;
}

export const CellHighlighted = ({
  newValue,
  isHighlighted,
}: CellHighlightedProps) => {
  const ref = useRef<string | number>(null);
  useEffect(() => {
    ref.current = newValue;
  });

  return (
    <td
      className={
        isHighlighted && ref.current !== newValue ? 'cell highlight' : 'cell'
      }
    >
      {newValue}
    </td>
  );
};
