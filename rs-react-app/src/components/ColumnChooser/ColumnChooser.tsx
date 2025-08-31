import { memo, useEffect, useState } from 'react';

import { ColumnsList } from '../ColumnsList/ColumnsList';
import { Modal } from '../Modal/Modal';
import './columnChooser.css';

interface ColumnChooserProps {
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  columns: Set<string>;
}

export const ColumnChooser = memo(function ColumnChooser({
  selectedColumns,
  setSelectedColumns,
  columns,
}: ColumnChooserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    function handleOutsideClick(e: Event) {
      const clickedElement = e.target;
      if (clickedElement instanceof HTMLElement) {
        if (clickedElement.classList.contains('modal-background')) {
          onClose();
        }
      }
    }
    function handleEscClick(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        className="columnChooser"
        onClick={() => {
          setIsModalOpen(true);
          document.body.style.overflow = 'hidden';
        }}
      >
        Column Chooser
      </button>
      {isModalOpen && (
        <Modal onClose={onClose}>
          <p>Select columns</p>
          <ColumnsList
            columns={columns}
            selectedItems={selectedColumns}
            setSelectedItems={setSelectedColumns}
          />
        </Modal>
      )}
    </>
  );
});
