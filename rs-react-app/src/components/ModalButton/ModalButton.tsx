import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import React from 'react';

export const ModalButton = ({
  name,
  renderItem,
}: {
  name: string;
  renderItem: (f: () => void) => React.ReactNode;
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
        {name}
      </button>
      {isModalOpen && <Modal onClose={onClose}>{renderItem(onClose)}</Modal>}
    </>
  );
};
