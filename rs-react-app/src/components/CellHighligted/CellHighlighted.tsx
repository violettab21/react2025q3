import { useEffect, useRef } from 'react';

export const CellHighlighted = ({
  newValue,
  isHighlighted,
}: {
  newValue: number | string;
  isHighlighted: boolean;
}) => {
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
