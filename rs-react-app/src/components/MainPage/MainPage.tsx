import { ControlledForm } from '../ControlledForm/ControlledForm';
import { ModalButton } from '../ModalButton/ModalButton';
import { Users } from '../Users/Users';

export const MainPage = () => {
  return (
    <main>
      <ModalButton
        name="Form1 - controlled components"
        renderItem={(onClose: () => void) => (
          <ControlledForm onClose={onClose} />
        )}
      />

      <Users />
    </main>
  );
};
