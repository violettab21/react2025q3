import { type User } from '../../store/usersSlice';
import './user.css';

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="user">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Image: </p>
      <p>Country: {user.country}</p>
    </div>
  );
};
