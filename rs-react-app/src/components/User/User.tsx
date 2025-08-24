import { type User } from '../../store/usersSlice';
import './user.css';

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="user" data-testid="user-id-test">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Country: {user.country}</p>
      <p>T&C: {user.terms ? 'confirmed' : 'not confirmed'}</p>
    </div>
  );
};
