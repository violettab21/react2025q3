import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export const ModalButton = ({
  name,
  modalContent,
}: {
  name: string;
  modalContent: React.ReactNode;
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
      {isModalOpen && <Modal onClose={onClose}>{modalContent}</Modal>}
    </>
  );
};
