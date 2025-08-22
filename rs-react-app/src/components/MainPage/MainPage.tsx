import { ModalButton } from '../ModalButton/ModalButton';

export const MainPage = () => {
  return (
    <main>
      <ModalButton
        name="Form1 - uncontrolled components"
        modalContent={'hello1'}
      />
      <ModalButton
        name="Form2 - controlled components"
        modalContent={'hello2'}
      />
    </main>
  );
};
