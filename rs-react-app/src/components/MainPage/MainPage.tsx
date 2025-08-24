import { useAppSelector } from '../../store/store';
import { ControlledForm } from '../forms/ControlledForm/ControlledForm';
import { UncontrolledForm } from '../forms/UncontrolledForm/UncontrolledForm';
import { ModalButton } from '../ModalButton/ModalButton';
import { Users } from '../Users/Users';
import './mainPage.css';

export const MainPage = () => {
  const usersControlled = useAppSelector((state) => state.usersControlled);
  const usersUncontrolled = useAppSelector((state) => state.usersUncontrolled);
  return (
    <main className="main">
      <div className="column">
        {' '}
        <ModalButton
          name="Form1 - controlled components"
          renderItem={(onClose: () => void) => (
            <ControlledForm onClose={onClose} />
          )}
        />
        <Users users={usersControlled} />
      </div>
      <div className="column">
        <ModalButton
          name="Form2 - uncontrolled components"
          renderItem={(onClose: () => void) => (
            <UncontrolledForm onClose={onClose} />
          )}
        />
        <Users users={usersUncontrolled} />
      </div>
    </main>
  );
};
