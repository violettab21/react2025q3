import { useState } from 'react';
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
