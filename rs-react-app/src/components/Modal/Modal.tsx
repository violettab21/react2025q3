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
    <div className="modal-background" data-testid="modal">
      <div className="modal">
        <button className="close" onClick={onClose}>
          Close
        </button>
        <div className="modal-content"> {children}</div>
      </div>
    </div>,
    document.body
  );
};
