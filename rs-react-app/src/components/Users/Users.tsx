import { useAppSelector } from '../../store/store';
import { UserCard } from '../User/User';
import './users.css';

export const Users = () => {
  const users = useAppSelector((state) => state.users);
  if (users.length === 0) {
    return (
      <div>
        <p>No users</p>
      </div>
    );
  }
  return (
    <div className="users">
      {users.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
    </div>
  );
};
