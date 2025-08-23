import { ControlledForm } from '../ControlledForm/ControlledForm';
import { ModalButton } from '../ModalButton/ModalButton';

export const MainPage = () => {
  return (
    <main>
      <ModalButton
        name="Form1 - uncontrolled components"
        modalContent={<ControlledForm />}
      />
      <ModalButton
        name="Form2 - controlled components"
        modalContent={<ControlledForm />}
      />
    </main>
  );
};
