import { useEffect, useState } from 'react';

import { ColumnsList } from '../ColumnsList/ColumnsList';
import { Modal } from '../Modal/Modal';

export const ColumnChooser = ({
  selectedItems,
  setSelectedItems,
}: {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    function handleOutsideClick(e: Event) {
      const clickedElement = e.target;
      if (clickedElement instanceof HTMLElement) {
        if (clickedElement.classList.contains('modal-background')) {
          setIsModalOpen(false);
        }
      }
    }
    function handleEscClick(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        setIsModalOpen(false);
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
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Column Chooser
      </button>
      {isModalOpen && (
        <Modal onClose={onClose}>
          <p>Select columns</p>
          <ColumnsList
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </Modal>
      )}
    </>
  );
};
