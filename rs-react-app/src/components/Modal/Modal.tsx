import { createPortal } from 'react-dom';
import './Modal.css';

export const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;

  children: React.ReactNode;
}) => {
  return createPortal(
    <div className="modal-background">
      <div className="modal">
        <div className="modal-content"> {children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
};
